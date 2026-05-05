const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { connectDatabase } = require('./config/database');
const config = require('./config/env');
const morganMiddleware = require('./middleware/logger.middleware');
const errorHandler = require('./middleware/errorHandler.middleware');
const { generalLimiter } = require('./middleware/rateLimiter.middleware');

// Import routes
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/orders.routes');
const userRoutes = require('./routes/users.routes');

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({ origin: config.CORS_ORIGIN })); // CORS
app.use(generalLimiter); // Rate limiting
app.use(morganMiddleware); // Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date(),
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Route not found',
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(config.PORT, () => {
      console.log(`✓ Server running on http://localhost:${config.PORT}`);
      console.log(`✓ Environment: ${config.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  const { disconnectDatabase } = require('./config/database');
  await disconnectDatabase();
  process.exit(0);
});

module.exports = { app, startServer };
