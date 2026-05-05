const Cart = require('../models/Cart');
const Product = require('../models/Product');
const logger = require('../utils/logger');

class CartService {
  async getCart(userId) {
    try {
      let cart = await Cart.findOne({ userId }).populate('items.productId');

      if (!cart) {
        cart = new Cart({ userId, items: [] });
        await cart.save();
      }

      return cart;
    } catch (error) {
      logger.error('Get cart error:', error);
      throw error;
    }
  }

  async addToCart(userId, productId, quantity) {
    try {
      // Verify product exists and has stock
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      if (product.stock < quantity) {
        throw new Error('Insufficient stock');
      }

      let cart = await Cart.findOne({ userId });

      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }

      // Check if product already in cart
      const existingItem = cart.items.find(item => item.productId.toString() === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          productId,
          quantity,
          price: product.price,
          discountPrice: product.discountPrice,
        });
      }

      await cart.save();

      logger.info(`Product added to cart: ${productId} for user: ${userId}`);

      return cart;
    } catch (error) {
      logger.error('Add to cart error:', error);
      throw error;
    }
  }

  async removeFromCart(userId, productId) {
    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        throw new Error('Cart not found');
      }

      cart.items = cart.items.filter(item => item.productId.toString() !== productId);

      await cart.save();

      logger.info(`Product removed from cart: ${productId}`);

      return cart;
    } catch (error) {
      logger.error('Remove from cart error:', error);
      throw error;
    }
  }

  async updateCartItem(userId, productId, quantity) {
    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        throw new Error('Cart not found');
      }

      const item = cart.items.find(item => item.productId.toString() === productId);

      if (!item) {
        throw new Error('Item not found in cart');
      }

      if (quantity <= 0) {
        cart.items = cart.items.filter(i => i.productId.toString() !== productId);
      } else {
        item.quantity = quantity;
      }

      await cart.save();

      return cart;
    } catch (error) {
      logger.error('Update cart item error:', error);
      throw error;
    }
  }

  async clearCart(userId) {
    try {
      const cart = await Cart.findOneAndUpdate(
        { userId },
        { items: [] },
        { new: true }
      );

      if (!cart) {
        throw new Error('Cart not found');
      }

      logger.info(`Cart cleared for user: ${userId}`);

      return cart;
    } catch (error) {
      logger.error('Clear cart error:', error);
      throw error;
    }
  }
}

module.exports = new CartService();
