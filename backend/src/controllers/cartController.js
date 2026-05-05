const cartService = require('../services/cartService');
const { formatResponse } = require('../utils/helpers');

class CartController {
  async getCart(req, res, next) {
    try {
      const cart = await cartService.getCart(req.userId);

      res.status(200).json(
        formatResponse(true, 200, 'Cart fetched successfully', cart, null)
      );
    } catch (error) {
      next(error);
    }
  }

  async addToCart(req, res, next) {
    try {
      const { productId, quantity } = req.body;

      if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json(
          formatResponse(false, 400, 'Invalid product or quantity', null, null)
        );
      }

      const cart = await cartService.addToCart(req.userId, productId, quantity);

      res.status(200).json(
        formatResponse(true, 200, 'Product added to cart', cart, null)
      );
    } catch (error) {
      if (error.message.includes('not found') || error.message === 'Insufficient stock') {
        return res.status(400).json(
          formatResponse(false, 400, error.message, null, null)
        );
      }
      next(error);
    }
  }

  async removeFromCart(req, res, next) {
    try {
      const { productId } = req.params;
      const cart = await cartService.removeFromCart(req.userId, productId);

      res.status(200).json(
        formatResponse(true, 200, 'Product removed from cart', cart, null)
      );
    } catch (error) {
      next(error);
    }
  }

  async updateCartItem(req, res, next) {
    try {
      const { productId } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity <= 0) {
        return res.status(400).json(
          formatResponse(false, 400, 'Invalid quantity', null, null)
        );
      }

      const cart = await cartService.updateCartItem(req.userId, productId, quantity);

      res.status(200).json(
        formatResponse(true, 200, 'Cart item updated', cart, null)
      );
    } catch (error) {
      next(error);
    }
  }

  async clearCart(req, res, next) {
    try {
      const cart = await cartService.clearCart(req.userId);

      res.status(200).json(
        formatResponse(true, 200, 'Cart cleared', cart, null)
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartController();
