const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    notificationPreferences: {
        lowStock: { type: Boolean, default: true },
    },

});

module.exports = mongoose.model("staff", staffSchema);