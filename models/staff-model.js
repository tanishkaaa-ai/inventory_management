const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("staff", staffSchema);