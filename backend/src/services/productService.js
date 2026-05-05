const Product = require('../models/Product');
const { generatePagination, getSearchQuery } = require('../utils/helpers');
const logger = require('../utils/logger');

class ProductService {
  async getAllProducts(filters) {
    try {
      const { page = 1, limit = 20, search, category, minPrice, maxPrice } = filters;
      const { skip, page: p, limit: l } = generatePagination(page, limit);

      // Build query
      let query = { isActive: true };

      if (search) {
        query = { ...query, ...getSearchQuery(search) };
      }

      if (category) {
        query.category = category;
      }

      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = minPrice;
        if (maxPrice) query.price.$lte = maxPrice;
      }

      const total = await Product.countDocuments(query);
      const products = await Product.find(query)
        .skip(skip)
        .limit(l)
        .sort({ createdAt: -1 });

      return {
        products,
        pagination: {
          total,
          page: p,
          limit: l,
          pages: Math.ceil(total / l),
        },
      };
    } catch (error) {
      logger.error('Get all products error:', error);
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const product = await Product.findById(productId).populate('reviews');

      if (!product) {
        throw new Error('Product not found');
      }

      return product;
    } catch (error) {
      logger.error('Get product by ID error:', error);
      throw error;
    }
  }

  async createProduct(productData) {
    try {
      const product = new Product(productData);
      await product.save();

      logger.info(`Product created: ${product.name}`);

      return product;
    } catch (error) {
      logger.error('Create product error:', error);
      throw error;
    }
  }

  async updateProduct(productId, updateData) {
    try {
      const product = await Product.findByIdAndUpdate(productId, updateData, {
        new: true,
        runValidators: true,
      });

      if (!product) {
        throw new Error('Product not found');
      }

      logger.info(`Product updated: ${product.name}`);

      return product;
    } catch (error) {
      logger.error('Update product error:', error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const product = await Product.findByIdAndUpdate(
        productId,
        { isActive: false },
        { new: true }
      );

      if (!product) {
        throw new Error('Product not found');
      }

      logger.info(`Product deleted: ${product.name}`);

      return product;
    } catch (error) {
      logger.error('Delete product error:', error);
      throw error;
    }
  }

  async getFeaturedProducts(limit = 10) {
    try {
      const products = await Product.find({ isActive: true, isFeatured: true })
        .limit(limit)
        .sort({ createdAt: -1 });

      return products;
    } catch (error) {
      logger.error('Get featured products error:', error);
      throw error;
    }
  }
}

module.exports = new ProductService();
