const Joi = require('joi');

const orderValidators = {
  create: Joi.object({
    items: Joi.array().items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().required().positive(),
      })
    ).required(),
    shippingAddress: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      country: Joi.string().required(),
    }).required(),
    payment: Joi.object({
      method: Joi.string().valid('credit_card', 'debit_card', 'paypal', 'stripe').required(),
      token: Joi.string().optional(),
    }).required(),
  }),

  updateStatus: Joi.object({
    status: Joi.string().valid('confirmed', 'processing', 'shipped', 'delivered', 'cancelled').required(),
    trackingNumber: Joi.string().optional(),
  }),
};

module.exports = orderValidators;
