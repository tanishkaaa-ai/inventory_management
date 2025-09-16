const mongoose = require("mongoose");

const notificationPreferenceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    emailEnabled: { type: Boolean, default: true },
    stockAlertsEnabled: { type: Boolean, default: true }
});

module.exports = mongoose.model("notificationPreference", notificationPreferenceSchema);
