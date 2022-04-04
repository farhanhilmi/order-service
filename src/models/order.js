import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'products',
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    products: {
      type: [productSchema],
      required: true,
      default: undefined,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'modifyDate' },
    collection: 'orders',
  },
);

export default mongoose.model('orders', orderSchema);
