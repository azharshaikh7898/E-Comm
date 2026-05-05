const User = require('../models/User');
const { generateToken } = require('../config/jwt');
const logger = require('../utils/logger');

class AuthService {
  async register(userData) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const user = new User(userData);
      await user.save();

      // Generate token
      const token = generateToken({ id: user._id, email: user.email, role: user.role });

      logger.info(`User registered: ${user.email}`);

      return {
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      logger.error('Registration error:', error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      // Find user and select password field
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Compare password
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate token
      const token = generateToken({ id: user._id, email: user.email, role: user.role });

      logger.info(`User logged in: ${user.email}`);

      return {
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      logger.error('Get user error:', error);
      throw error;
    }
  }

  async updateUser(userId, updateData) {
    try {
      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        throw new Error('User not found');
      }

      logger.info(`User updated: ${user.email}`);

      return user;
    } catch (error) {
      logger.error('Update user error:', error);
      throw error;
    }
  }
}

module.exports = new AuthService();
