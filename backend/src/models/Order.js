const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
        subtotal: Number,
      },
    ],
    shippingAddress: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    billingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    payment: {
      method: {
        type: String,
        enum: ['credit_card', 'debit_card', 'paypal', 'stripe'],
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',
      },
      transactionId: String,
      paidAt: Date,
    },
    pricing: {
      subtotal: Number,
      shippingCost: {
        type: Number,
        default: 0,
      },
      tax: {
        type: Number,
        default: 0,
      },
      discount: {
        type: Number,
        default: 0,
      },
      total: Number,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
      index: true,
    },
    trackingNumber: String,
    notes: String,
    cancelReason: String,
    estimatedDelivery: Date,
  },
  { timestamps: true }
);

// Create indexes for efficient querying
OrderSchema.index({ userId: 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ orderNumber: 1 });

// Generate order number before saving
OrderSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  try {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${String(count + 1).padStart(5, '0')}`;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Order', OrderSchema);
