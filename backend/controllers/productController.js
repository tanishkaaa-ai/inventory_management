const express = require('express');
const router = express.Router();
const productModel = require("../models/product-model");
const inventoryLogModel = require("../models/inventoryLog-model");

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

        res.send("Stock updated and action logged successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports.getLogs = async function (req, res) {
    try {
        const logs = await inventoryLogModel.find().populate("product").populate("userId").sort({ timestamp: -1 });
        res.json(logs);   ///need to fix this
    } catch (err) {
        res.status(500).send(err.message);
    }
};
