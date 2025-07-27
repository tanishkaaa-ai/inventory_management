// routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const { updateNotiPreferences } = require("../controllers/notiController");
const isLoggedIn = require("../middlewares/isLoggedInAny");

router.put("/preferences", isLoggedIn, updateNotiPreferences);

module.exports = router;
