const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        discountPrice: Number,
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    totalItems: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    couponCode: String,
    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// TTL index: automatically delete cart after 7 days of inactivity
CartSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 604800 });

// Calculate totals before saving
CartSchema.pre('save', function (next) {
  this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.totalPrice = this.items.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + price * item.quantity;
  }, 0);
  this.totalPrice -= this.discount || 0;
  next();
});

module.exports = mongoose.model('Cart', CartSchema);
