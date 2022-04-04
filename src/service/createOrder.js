import grpc from '@grpc/grpc-js';
import { addNewOrder } from '../repository/orderRepo.js';
import { validateAddOrder } from '../utils/validation.js';
import productService from './productService.js';

export default async (call, callback) => {
  try {
    const { userId, products } = call.request;
    const { error } = validateAddOrder({ userId, products });
    if (error) {
      callback({
        code: 3,
        message: 'sas',
        status: grpc.status.INVALID_ARGUMENT,
      });
    }

    let totalPrice = 0;
    const newProduct = await Promise.all(
      products.map(async (prod) => {
        const product = await productService.getProductByid(prod.productId);
        if (product.quantity < prod.qty) {
          throw Error(`insufficient quantity for orderId ${product._id}`);
        }
        totalPrice += product.price * prod.qty;
        return { productId: product._id, price: product.price, qty: prod.qty };
      }),
    );

    const newOrder = await addNewOrder({
      userId,
      products: newProduct,
      total: totalPrice,
    });
    callback(null, newOrder);
  } catch (err) {
    callback(err);
  }
};
