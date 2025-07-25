const express = require('express');
const router = express.Router();
const productModel = require("../models/product-model");
const inventoryLogModel = require("../models/inventoryLog-model");
const notificationPreferenceModel = require("../models/notiPref-model");
const { sendLowStockAlert } = require("../utils/emailService");

// Get all products
module.exports.getAllProducts = async function (req, res) {
    try {
        let products = await productModel.find();
        res.send(products);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Create a new product (Admin only)
module.exports.createProduct = async function (req, res) {
    try {
        let { sku, name, barcode, category, stock, threshold, expiryDate } = req.body;

        let exists = await productModel.findOne({ sku: sku });
        if (exists) return res.status(400).send("SKU already exists");

        let product = await productModel.create({
            sku,
            name,
            barcode,
            category,
            stock,
            threshold,
            expiryDate
        });

        res.send("Product created successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Update a product (Admin only)
module.exports.updateProduct = async function (req, res) {
    try {
        let id = req.params.id;
        let updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedProduct) return res.status(404).send("Product not found");

        res.send("Product updated successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Delete a product (Admin only)
module.exports.deleteProduct = async function (req, res) {
    try {
        let id = req.params.id;
        let deleted = await productModel.findByIdAndDelete(id);

        if (!deleted) return res.status(404).send("Product not found");

        res.send("Product deleted successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
};


module.exports.updateStock = async function (req, res) {
    try {
        const { sku, action, quantity } = req.body;
        const userId = req.user._id; // assumes you have middleware setting req.user

        if (!sku || !action || typeof quantity !== "number" || quantity < 0) {
            return res.status(400).send("Invalid request data");
        }

        const product = await productModel.findOne({ sku });
        if (!product) return res.status(404).send("Product not found");

        switch (action) {
            case "sale":
                if (product.stock < quantity) {
                    return res.status(400).send("Insufficient stock");
                }
                product.stock -= quantity;
                break;
            case "return":
            case "restock":
                product.stock += quantity;
                break;
            default:
                return res.status(400).send("Invalid action type");
        }

        await product.save();

        // Log the action
        await inventoryLogModel.create({
            product: product._id,
            action: action === "sale" ? "remove" : "add",
            quantity,
            userId,
            remarks: `Stock ${action} by ${userId}`
        });

        if (product.stock < product.threshold) {
            const admins = await adminModel.find();
            for (const admin of admins) {
                const pref = await notificationPreferenceModel.findOne({ user: admin._id });
                if (pref?.emailEnabled && pref.stockAlertsEnabled) {
                    await sendLowStockAlert(admin.email, product);
                }
            }
        }


        res.send("Stock updated and action logged successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports.getLogs = async function (req, res) {
    try {
        const logs = await inventoryLogModel
            .find()
            .populate("product")
            .populate("userId")
            .sort({ timestamp: -1 });

        console.log(`✅ Total Logs: ${logs.length}`);

        if (logs.length === 0) {
            console.log("⚠️ No inventory logs found.");
        }

        logs.forEach((log, index) => {
            try {
                console.log(`
==== LOG ${index + 1} ====
Product: ${log.product?.name || "N/A"}
Action: ${log.action}
Quantity: ${log.quantity}
User: ${log.userId?.name || "Unknown"}
Timestamp: ${new Date(log.timestamp).toLocaleString()}
-----------------------`);
            } catch (logErr) {
                console.error("Error printing log:", logErr.message);
            }
        });

        res.send("Logs printed to console");
    } catch (err) {
        console.error("Error fetching logs:", err);
        res.status(500).send(err.message);
    }
};
