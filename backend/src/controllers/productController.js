const productService = require('../services/productService');
const { formatResponse } = require('../utils/helpers');
const productValidators = require('../validators/productValidator');

class ProductController {
  async getAllProducts(req, res, next) {
    try {
      const result = await productService.getAllProducts(req.query);

      res.status(200).json(
        formatResponse(
          true,
          200,
          'Products fetched successfully',
          result.products,
          result.pagination
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const product = await productService.getProductById(req.params.id);

      res.status(200).json(
        formatResponse(true, 200, 'Product fetched successfully', product, null)
      );
    } catch (error) {
      if (error.message === 'Product not found') {
        return res.status(404).json(
          formatResponse(false, 404, error.message, null, null)
        );
      }
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      // Validate input
      const { error } = productValidators.create.validate(req.body);
      if (error) {
        return res.status(400).json(
          formatResponse(false, 400, 'Validation error', null, null)
        );
      }

      const product = await productService.createProduct({
        ...req.body,
        createdBy: req.userId,
      });

      res.status(201).json(
        formatResponse(true, 201, 'Product created successfully', product, null)
      );
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      // Validate input
      const { error } = productValidators.update.validate(req.body);
      if (error) {
        return res.status(400).json(
          formatResponse(false, 400, 'Validation error', null, null)
        );
      }

      const product = await productService.updateProduct(req.params.id, req.body);

      res.status(200).json(
        formatResponse(true, 200, 'Product updated successfully', product, null)
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const product = await productService.deleteProduct(req.params.id);

      res.status(200).json(
        formatResponse(true, 200, 'Product deleted successfully', product, null)
      );
    } catch (error) {
      next(error);
    }
  }

  async getFeaturedProducts(req, res, next) {
    try {
      const products = await productService.getFeaturedProducts();

      res.status(200).json(
        formatResponse(
          true,
          200,
          'Featured products fetched successfully',
          products,
          null
        )
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
