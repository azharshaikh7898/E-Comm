require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '7d',
  BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 10,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:4200',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};
