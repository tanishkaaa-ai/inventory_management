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
router.get("/search",isLoggedInAny, search);
router.get("/aggregate/category", isLoggedInAny,aggregateCategory);
router.get("/aggregate/low-stock",isLoggedInAny, aggregateLowStock);
router.get("/aggregate/recent",isLoggedInAny, recents);

router.get("/logs",isAdmin, getLogs);

router.get('/export/excel',isLoggedInAny, exportToExcel);
router.get('/export/pdf',isLoggedInAny, exportToPDF);


router.get("/log/export/excel",isLoggedinadmin, exportLogsExcel);
router.get("/log/export/pdf", isLoggedinadmin,exportLogsPDF);
module.exports = router;
