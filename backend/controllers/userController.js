const NotificationPreference = require("../models/notificationPreference-model");

module.exports.setNotificationPreferences = async function (req, res) {
    try {
        const userId = req.user._id;
        const { emailEnabled, stockAlertsEnabled } = req.body;

        const updated = await NotificationPreference.findOneAndUpdate(
            { user: userId },
            { emailEnabled, stockAlertsEnabled },
            { upsert: true, new: true }
        );

        res.send("Preferences updated");
    } catch (err) {
        res.status(500).send(err.message);
    }
};
