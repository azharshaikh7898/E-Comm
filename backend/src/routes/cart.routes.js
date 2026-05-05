const express = require('express');
const cartController = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

// All cart routes require authentication
router.use(authMiddleware);

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/:productId', cartController.updateCartItem);
router.delete('/:productId', cartController.removeFromCart);
router.delete('/', cartController.clearCart);

module.exports = router;
