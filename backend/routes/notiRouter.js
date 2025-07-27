const express = require("express");
const router = express.Router();
const notiController = require("../controllers/notiController");
const isLoggedInAny = require("../middlewares/isLoggedInAny");

// Call manually or on a schedule (e.g., CRON)
router.get("/alerts/low-stock", isLoggedInAny, notiController.sendLowStockAlerts);

// Staff/Admin can update their own preferences
router.post("/alerts/preferences", isLoggedInAny, notiController.setNotificationPreferences);

module.exports = router;
