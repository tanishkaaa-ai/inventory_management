const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  search,
  aggregateCategory,
  aggregateLowStock,
  recents
} = require('../controllers/productController');

const { getLogs } = require("../controllers/productController");

const { exportToExcel, exportToPDF } = require("../controllers/exportController");

// Auth middleware (write your own)
const isAuthenticated = require('../middlewares/isLoggedin');
const isAdmin = require('../middlewares/isLoggedinadmin');

const isLoggedInAny = require('../middlewares/isLoggedInAny');

const { exportLogsExcel, exportLogsPDF } = require("../controllers/exportController");
const isLoggedinadmin = require("../middlewares/isLoggedinadmin");
router.get('/',isLoggedInAny, getAllProducts);
router.post('/create',isAdmin, createProduct);
router.put('/update/:id',isAdmin, updateProduct);
router.delete('/delete/:id',isAdmin, deleteProduct);
router.put("/updateStock",isLoggedInAny, updateStock);
router.get("/search", search);
router.get("/aggregate/category", aggregateCategory);
router.get("/aggregate/low-stock", aggregateLowStock);
router.get("/aggregate/recent", recents);

router.get("/logs", getLogs);

router.get('/export/excel', exportToExcel);
router.get('/export/pdf', exportToPDF);


router.get("/log/export/excel", exportLogsExcel);
router.get("/log/export/pdf", exportLogsPDF);
module.exports = router;
