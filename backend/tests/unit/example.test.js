// tests/unit/auth.test.js
const authService = require('../../src/services/authService');
const User = require('../../src/models/User');

jest.mock('../../src/models/User');

describe('Auth Service', () => {
  describe('register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      User.findOne.mockResolvedValue(null);
      User.prototype.save = jest.fn().mockResolvedValue({
        _id: '123',
        ...userData,
        toJSON: () => ({ _id: '123', ...userData }),
      });

      const result = await authService.register(userData);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(User.findOne).toHaveBeenCalledWith({ email: userData.email });
    });

    it('should throw error if user already exists', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      User.findOne.mockResolvedValue({ email: userData.email });

      await expect(authService.register(userData)).rejects.toThrow(
        'User with this email already exists'
      );
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const email = 'john@example.com';
      const password = 'password123';

      const mockUser = {
        _id: '123',
        email,
        comparePassword: jest.fn().mockResolvedValue(true),
        save: jest.fn().mockResolvedValue(true),
        toJSON: () => ({ _id: '123', email }),
      };

      User.findOne.mockResolvedValue(mockUser);

      const result = await authService.login(email, password);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(mockUser.comparePassword).toHaveBeenCalledWith(password);
    });

    it('should throw error on invalid credentials', async () => {
      User.findOne.mockResolvedValue(null);

      await expect(authService.login('john@example.com', 'wrongpassword')).rejects.toThrow(
        'Invalid email or password'
      );
    });
  });
});

// tests/unit/product.test.js
const productService = require('../../src/services/productService');
const Product = require('../../src/models/Product');

jest.mock('../../src/models/Product');

describe('Product Service', () => {
  describe('getAllProducts', () => {
    it('should fetch all products with pagination', async () => {
      const mockProducts = [
        {
          _id: '1',
          name: 'Product 1',
          price: 100,
          category: 'Electronics',
        },
      ];

      Product.countDocuments.mockResolvedValue(50);
      Product.find = jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(mockProducts),
        }),
      });

      const result = await productService.getAllProducts({
        page: 1,
        limit: 20,
      });

      expect(result.products).toEqual(mockProducts);
      expect(result.pagination.total).toBe(50);
      expect(result.pagination.page).toBe(1);
    });
  });

  describe('getProductById', () => {
    it('should fetch product by id', async () => {
      const mockProduct = {
        _id: '1',
        name: 'Product 1',
        price: 100,
      };

      Product.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockProduct),
      });

      const result = await productService.getProductById('1');

      expect(result).toEqual(mockProduct);
      expect(Product.findById).toHaveBeenCalledWith('1');
    });

    it('should throw error if product not found', async () => {
      Product.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      });

      await expect(productService.getProductById('invalid')).rejects.toThrow(
        'Product not found'
      );
    });
  });
});

// tests/unit/cart.test.js
const cartService = require('../../src/services/cartService');
const Cart = require('../../src/models/Cart');
const Product = require('../../src/models/Product');

jest.mock('../../src/models/Cart');
jest.mock('../../src/models/Product');

describe('Cart Service', () => {
  describe('addToCart', () => {
    it('should add item to cart', async () => {
      const userId = 'user123';
      const productId = 'product123';
      const quantity = 2;

      const mockProduct = {
        _id: productId,
        name: 'Test Product',
        price: 100,
        stock: 10,
      };

      const mockCart = {
        userId,
        items: [],
        save: jest.fn().mockResolvedValue({
          userId,
          items: [{ productId, quantity, price: 100 }],
        }),
      };

      Product.findById.mockResolvedValue(mockProduct);
      Cart.findOne.mockResolvedValue(mockCart);

      const result = await cartService.addToCart(userId, productId, quantity);

      expect(result.items.length).toBeGreaterThan(0);
      expect(mockCart.save).toHaveBeenCalled();
    });

    it('should throw error if product not found', async () => {
      Product.findById.mockResolvedValue(null);

      await expect(
        cartService.addToCart('user123', 'invalid', 1)
      ).rejects.toThrow('Product not found');
    });

    it('should throw error if insufficient stock', async () => {
      const mockProduct = {
        _id: 'product123',
        stock: 2,
      };

      Product.findById.mockResolvedValue(mockProduct);

      await expect(
        cartService.addToCart('user123', 'product123', 10)
      ).rejects.toThrow('Insufficient stock');
    });
  });
});
