const mongoose = require("mongoose");

const InventoryLogSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    action: { type: String, enum: ["add", "remove", "update"], required: true },
    quantity: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, default: Date.now },
    remarks: { type: String }
});

module.exports = mongoose.model("InventoryLog", InventoryLogSchema);
