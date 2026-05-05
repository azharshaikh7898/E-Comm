const Joi = require('joi');

const productValidators = {
  create: Joi.object({
    name: Joi.string().required().min(3).max(200),
    description: Joi.string().required().min(10),
    price: Joi.number().required().positive(),
    discountPrice: Joi.number().optional().positive(),
    category: Joi.string().required(),
    subCategory: Joi.string().optional(),
    sku: Joi.string().required().unique(),
    stock: Joi.number().required().min(0),
    images: Joi.array().optional(),
    tags: Joi.array().optional(),
  }),

  update: Joi.object({
    name: Joi.string().optional().min(3).max(200),
    description: Joi.string().optional().min(10),
    price: Joi.number().optional().positive(),
    discountPrice: Joi.number().optional().positive(),
    category: Joi.string().optional(),
    stock: Joi.number().optional().min(0),
  }),

  search: Joi.object({
    query: Joi.string().optional(),
    category: Joi.string().optional(),
    minPrice: Joi.number().optional().min(0),
    maxPrice: Joi.number().optional().positive(),
    page: Joi.number().optional().min(1),
    limit: Joi.number().optional().min(1).max(100),
  }),
};

module.exports = productValidators;
