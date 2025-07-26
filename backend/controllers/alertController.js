const notiPrefModel = require("../models/notiPref-model");
const Product = require("../models/product-model");
const { sendLowStockAlert } = require("../utils/emailService");

module.exports.triggerAlert = async function (req, res) {
    try {
        const { sku } = req.body;
        const product = await Product.findOne({ sku });

        if (!product) return res.status(404).send("Product not found");

        if (product.stock >= product.threshold)
            return res.send("Stock is sufficient. No alert sent.");

        const admins = await adminModel.find();
        for (const admin of admins) {
            const pref = await notiPrefModel.findOne({ user: admin._id });
            if (pref?.emailEnabled && pref.stockAlertsEnabled) {
                await sendLowStockAlert(admin.email, product);
            }
        }

        res.send("Alert(s) sent");
    } catch (err) {
        res.status(500).send(err.message);
    }
};
