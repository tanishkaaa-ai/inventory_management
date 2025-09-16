const mongoose = require("mongoose");
require("../models/admin-model"); // or wherever your model is


const InventoryLogSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    action: { type: String, enum: ["add", "remove", "update"], required: true },
    quantity: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "admin", required: true },
    timestamp: { type: Date, default: Date.now },
    remarks: { type: String }
});

module.exports = mongoose.model("inventorylog", inventoryLogSchema);
