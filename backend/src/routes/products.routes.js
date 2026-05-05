const express = require('express');
const productController = require('../controllers/productController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');
const { apiLimiter } = require('../middleware/rateLimiter.middleware');

const router = express.Router();

// Public routes
router.get('/', apiLimiter, productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/:id', productController.getProductById);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;
