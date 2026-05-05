const authService = require('../services/authService');
const { formatResponse } = require('../utils/helpers');
const authValidators = require('../validators/authValidator');

class AuthController {
  async register(req, res, next) {
    try {
      // Validate input
      const { error } = authValidators.register.validate(req.body);
      if (error) {
        return res.status(400).json(
          formatResponse(false, 400, 'Validation error', null, null)
        );
      }

      const result = await authService.register(req.body);

      res.status(201).json(
        formatResponse(true, 201, 'User registered successfully', result, null)
      );
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      // Validate input
      const { error } = authValidators.login.validate(req.body);
      if (error) {
        return res.status(400).json(
          formatResponse(false, 400, 'Validation error', null, null)
        );
      }

      const { email, password } = req.body;
      const result = await authService.login(email, password);

      res.status(200).json(
        formatResponse(true, 200, 'Login successful', result, null)
      );
    } catch (error) {
      if (error.message === 'Invalid email or password') {
        return res.status(401).json(
          formatResponse(false, 401, error.message, null, null)
        );
      }
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const user = await authService.getUserById(req.userId);

      res.status(200).json(
        formatResponse(true, 200, 'Profile fetched successfully', user, null)
      );
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const user = await authService.updateUser(req.userId, req.body);

      res.status(200).json(
        formatResponse(true, 200, 'Profile updated successfully', user, null)
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
