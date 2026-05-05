const Joi = require('joi');

const authValidators = {
  register: Joi.object({
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(100),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    phone: Joi.string().optional(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  updatePassword: Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required().min(6).max(100),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
  }),
};

module.exports = authValidators;
