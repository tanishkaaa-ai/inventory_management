// controllers/notificationController.js
const Admin = require("../models/admin-model");
const Staff = require("../models/staff-model");

module.exports.updateNotiPreferences = async function (req, res){
  const userId = req.user._id;  // from middleware
  const { notifyOnLowStock, notificationFrequency } = req.body;

  try {
    let updatedUser;

    if (req.userType === "admin") {
      updatedUser = await Admin.findByIdAndUpdate(req.user._id, {
        notifyOnLowStock,
        notificationFrequency
      }, { new: true });
      
    } else if (req.userType === "staff") {
      updatedUser = await Staff.findByIdAndUpdate(req.user._id, {
        notifyOnLowStock,
        notificationFrequency
      }, { new: true });
    }

    res.status(200).json({
      message: "Notification preferences updated",
      preferences: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update preferences", error: error.message });
  }
};
