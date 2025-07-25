const productModel = require("../models/product-model");

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
