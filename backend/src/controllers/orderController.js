const orderService = require('../services/orderService');
const paymentService = require('../services/paymentService');
const emailService = require('../services/emailService');
const { formatResponse } = require('../utils/helpers');
const orderValidators = require('../validators/orderValidator');

class OrderController {
  async createOrder(req, res, next) {
    try {
      // Validate input
      const { error } = orderValidators.create.validate(req.body);
      if (error) {
        return res.status(400).json(
          formatResponse(false, 400, 'Validation error', null, null)
        );
      }

      // Process payment (mock for now)
      const paymentResult = await paymentService.processPayment(req.body.payment);

      if (!paymentResult.success) {
        return res.status(400).json(
          formatResponse(false, 400, 'Payment failed', null, null)
        );
      }

      // Create order
      const order = await orderService.createOrder(req.userId, req.body);

      // Update payment info
      order.payment.transactionId = paymentResult.transactionId;
      order.payment.status = paymentResult.status;
      order.payment.paidAt = new Date();
      await order.save();

      // Send confirmation email
      await emailService.sendOrderConfirmation(req.user?.email, order.orderNumber);

      res.status(201).json(
        formatResponse(true, 201, 'Order created successfully', order, null)
      );
    } catch (error) {
      if (
        error.message.includes('out of stock') ||
        error.message === 'Cart is empty'
      ) {
        return res.status(400).json(
          formatResponse(false, 400, error.message, null, null)
        );
      }
      next(error);
    }
  }

  async getOrder(req, res, next) {
    try {
      const order = await orderService.getOrderById(req.params.id);

      // Verify ownership
      if (order.userId.toString() !== req.userId && req.userRole !== 'admin') {
        return res.status(403).json(
          formatResponse(false, 403, 'Forbidden', null, null)
        );
      }

      res.status(200).json(
        formatResponse(true, 200, 'Order fetched successfully', order, null)
      );
    } catch (error) {
      if (error.message === 'Order not found') {
        return res.status(404).json(
          formatResponse(false, 404, error.message, null, null)
        );
      }
      next(error);
    }
  }

  async getUserOrders(req, res, next) {
    try {
      const result = await orderService.getUserOrders(req.userId, req.query);

      res.status(200).json(
        formatResponse(
          true,
          200,
          'Orders fetched successfully',
          result.orders,
          result.pagination
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async updateOrderStatus(req, res, next) {
    try {
      // Validate input
      const { error } = orderValidators.updateStatus.validate(req.body);
      if (error) {
        return res.status(400).json(
          formatResponse(false, 400, 'Validation error', null, null)
        );
      }

      const { status, trackingNumber } = req.body;
      const order = await orderService.updateOrderStatus(req.params.id, status, trackingNumber);

      res.status(200).json(
        formatResponse(true, 200, 'Order status updated', order, null)
      );
    } catch (error) {
      next(error);
    }
  }

  async cancelOrder(req, res, next) {
    try {
      const { reason } = req.body;
      const order = await orderService.cancelOrder(req.params.id, reason);

      res.status(200).json(
        formatResponse(true, 200, 'Order cancelled', order, null)
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
