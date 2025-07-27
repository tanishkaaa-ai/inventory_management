const express = require("express");
const router = express.Router();
const { exportLogsExcel, exportLogsPDF } = require("../controllers/exportController");
const isLoggedInAny = require("../middlewares/isLoggedInAny");

// Export Inventory Logs

router.get("/export/excel", isLoggedInAny, exportLogsExcel);
router.get("/export/pdf", isLoggedInAny, exportLogsPDF);

module.exports = router;
