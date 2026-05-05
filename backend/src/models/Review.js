const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    helpful: {
      type: Number,
      default: 0,
    },
    images: [String],
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ productId: 1, createdAt: -1 });
ReviewSchema.index({ userId: 1 });

module.exports = mongoose.model('Review', ReviewSchema);
