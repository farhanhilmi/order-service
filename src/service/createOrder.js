import grpc from '@grpc/grpc-js';
import { validateAddOrder } from '../utils/validation.js';
import productService from './productService.js';

import producer from './kafkaProducer.js';

export default async (call, callback) => {
  try {
    const { userId, products } = call.request;
    console.log(call.request);
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
          throw Error(`insufficient quantity for productId ${product._id}`);
        }
        totalPrice += product.price * prod.qty;
        return { productId: product._id, price: product.price, qty: prod.qty };
      }),
    );

    producer.sendRecord('user_order', {
      userId,
      products: newProduct,
      total: totalPrice,
    });

    callback(null, { status: 'successfully published to topic' });
  } catch (err) {
    callback(err);
  }
};
