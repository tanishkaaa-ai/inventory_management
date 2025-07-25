const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
} = require('../controllers/productController');

// Auth middleware (write your own)
const isAuthenticated = require('../middlewares/isLoggedin');
const isAdmin = require('../middlewares/isLoggedinadmin');

router.get('/', isAuthenticated, isAdmin, getAllProducts);
router.post('/create', isAdmin, createProduct);
router.put('/update/:id', isAdmin, updateProduct);
router.delete('/delete/:id', isAdmin, deleteProduct);
router.put("/updateStock", isAdmin, updateStock);

module.exports = router;
