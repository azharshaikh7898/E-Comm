const express = require('express');
const orderController = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

// All order routes require authentication
router.use(authMiddleware);

router.post('/', orderController.createOrder);
router.get('/', orderController.getUserOrders);
router.get('/:id', orderController.getOrder);

// Admin routes
router.put('/:id/status', adminMiddleware, orderController.updateOrderStatus);
router.post('/:id/cancel', orderController.cancelOrder);

module.exports = router;
