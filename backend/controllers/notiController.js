const nodemailer = require("nodemailer");
const Admin = require("../models/admin-model");
const Staff = require("../models/staff-model");
const Product = require("../models/product-model");

// Configure SMTP or SendGrid
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use environment variables in real projects
  },
});

exports.sendLowStockAlerts = async (req, res) => {
  try {
    const lowStockProducts = await Product.find({ $expr: { $lt: ["$stock", "$threshold"] } });

    if (lowStockProducts.length === 0) return res.status(200).send("No low-stock products");

    const admins = await Admin.find({ "notificationPreferences.lowStock": true });
    const staffs = await Staff.find({ "notificationPreferences.lowStock": true });

    const users = [...admins, ...staffs];

    for (let user of users) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Low Stock Alert",
        text: `The following items are below their stock threshold:\n\n` +
              lowStockProducts.map(p => `${p.name} (Stock: ${p.stock}, Threshold: ${p.threshold})`).join("\n")
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(200).send("Low stock emails sent");
  } catch (err) {
    res.status(500).send("Failed to send alerts: " + err.message);
  }
};

// Allow user to update preferences
exports.setNotificationPreferences = async (req, res) => {
  const { userId, role, preferences } = req.body;

  try {
    let Model = role === "admin" ? Admin : Staff;
    const user = await Model.findByIdAndUpdate(userId, { notificationPreferences: preferences }, { new: true });
    if (!user) return res.status(404).send("User not found");

    res.status(200).json({ message: "Preferences updated", preferences: user.notificationPreferences });
  } catch (err) {
    res.status(500).send("Error updating preferences: " + err.message);
  }
};
