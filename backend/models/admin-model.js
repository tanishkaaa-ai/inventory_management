const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    notifyOnLowStock: { type: Boolean, default: true },  // New field
    notificationFrequency: {
        type: String,
        enum: ["immediate", "daily", "never"],
        default: "immediate"
    }
})

module.exports = mongoose.model("admin", adminSchema);