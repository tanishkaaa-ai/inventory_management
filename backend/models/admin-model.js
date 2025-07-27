const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    notificationPreferences: {
        lowStock: { type: Boolean, default: true },
    },
})

module.exports = mongoose.model("admin", adminSchema);