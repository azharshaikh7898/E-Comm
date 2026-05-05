const CONSTANTS = {
  // User roles
  ROLES: {
    CUSTOMER: 'customer',
    ADMIN: 'admin',
  },

  // Order status
  ORDER_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
  },

  // Payment status
  PAYMENT_STATUS: {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
  },

  // Payment methods
  PAYMENT_METHODS: {
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    PAYPAL: 'paypal',
    STRIPE: 'stripe',
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
  },

  // Messages
  MESSAGES: {
    SUCCESS: 'Operation successful',
    ERROR: 'An error occurred',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Forbidden access',
    NOT_FOUND: 'Resource not found',
    INVALID_INPUT: 'Invalid input provided',
  },
};

module.exports = CONSTANTS;
