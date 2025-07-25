const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// Auth middleware (write your own)
const isAuthenticated = require('../middlewares/isLoggedinadmin');
const isAdmin = require('../middlewares/isLoggedinadmin');

router.get('/', isAuthenticated, getAllProducts);
router.post('/create', isAuthenticated, isAdmin, createProduct);
router.put('/update/:id', isAuthenticated, isAdmin, updateProduct);
router.delete('/delete/:id', isAuthenticated, isAdmin, deleteProduct);

module.exports = router;
