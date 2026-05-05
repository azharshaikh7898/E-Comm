const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { generatePagination } = require('../utils/helpers');
const logger = require('../utils/logger');

class OrderService {
  async createOrder(userId, orderData) {
    try {
      // Get cart items
      const cart = await Cart.findOne({ userId }).populate('items.productId');

      if (!cart || cart.items.length === 0) {
        throw new Error('Cart is empty');
      }

      // Verify products and update stock
      let subtotal = 0;
      const orderItems = [];

      for (const item of cart.items) {
        const product = await Product.findById(item.productId);

        if (!product || product.stock < item.quantity) {
          throw new Error(`Product ${item.productId} is out of stock`);
        }

        const price = item.discountPrice || item.price;
        const itemSubtotal = price * item.quantity;
        subtotal += itemSubtotal;

        orderItems.push({
          productId: item.productId,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          subtotal: itemSubtotal,
        });

        // Update stock
        await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: -item.quantity } }
        );
      }

      // Calculate totals
      const tax = Math.round(subtotal * 0.1 * 100) / 100; // 10% tax
      const total = subtotal + tax + (orderData.shippingCost || 0) - (orderData.discount || 0);

      // Create order
      const order = new Order({
        userId,
        items: orderItems,
        shippingAddress: orderData.shippingAddress,
        billingAddress: orderData.billingAddress || orderData.shippingAddress,
        payment: {
          method: orderData.payment.method,
          status: 'pending',
        },
        pricing: {
          subtotal,
          shippingCost: orderData.shippingCost || 0,
          tax,
          discount: orderData.discount || 0,
          total,
        },
      });

      await order.save();

      // Clear cart
      await Cart.updateOne({ userId }, { items: [] });

      logger.info(`Order created: ${order.orderNumber}`);

      return order;
    } catch (error) {
      logger.error('Create order error:', error);
      throw error;
    }
  }

  async getOrderById(orderId) {
    try {
      const order = await Order.findById(orderId).populate('items.productId');

      if (!order) {
        throw new Error('Order not found');
      }

      return order;
    } catch (error) {
      logger.error('Get order error:', error);
      throw error;
    }
  }

  async getUserOrders(userId, filters) {
    try {
      const { page = 1, limit = 20, status } = filters;
      const { skip, page: p, limit: l } = generatePagination(page, limit);

      let query = { userId };

      if (status) {
        query.status = status;
      }

      const total = await Order.countDocuments(query);
      const orders = await Order.find(query)
        .skip(skip)
        .limit(l)
        .sort({ createdAt: -1 });

      return {
        orders,
        pagination: {
          total,
          page: p,
          limit: l,
          pages: Math.ceil(total / l),
        },
      };
    } catch (error) {
      logger.error('Get user orders error:', error);
      throw error;
    }
  }

  async updateOrderStatus(orderId, status, trackingNumber) {
    try {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { status, ...(trackingNumber && { trackingNumber }) },
        { new: true }
      );

      if (!order) {
        throw new Error('Order not found');
      }

      logger.info(`Order status updated: ${order.orderNumber} - ${status}`);

      return order;
    } catch (error) {
      logger.error('Update order status error:', error);
      throw error;
    }
  }

  async cancelOrder(orderId, reason) {
    try {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { status: 'cancelled', cancelReason: reason },
        { new: true }
      );

      if (!order) {
        throw new Error('Order not found');
      }

      // Restore product stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: item.quantity } }
        );
      }

      logger.info(`Order cancelled: ${order.orderNumber}`);

      return order;
    } catch (error) {
      logger.error('Cancel order error:', error);
      throw error;
    }
  }
}

module.exports = new OrderService();
