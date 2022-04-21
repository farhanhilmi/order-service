import grpc from '@grpc/grpc-js';
import { validateAddOrder } from '../utils/validation.js';
import productService from './productService.js';

import producer from './kafkaProducer.js';

export default async (call, callback) => {
  try {
    const { userId, products } = call.request;
    // validation
    const { error } = validateAddOrder({ userId, products });
    if (error) {
      callback({
        code: 3,
        message: 'make sure the input pattern is correct',
        status: grpc.status.INVALID_ARGUMENT,
      });
    }

    // let totalPrice = 0;
    // const newProduct = await Promise.all(
    //   products.map(async (prod) => {
    //     const product = await productService.getProductByid(prod.productId);
    //     console.log('product', product);
    //     if (product.quantity < prod.qty) {
    //       throw Error(`insufficient quantity for productId ${product._id}`);
    //     }
    //     await productService.updateProductQty(prod.productId, prod.qty);

    //     totalPrice += product.price * prod.qty;
    //     return { productId: product._id, price: product.price, qty: prod.qty };
    //   }),
    // );
    const { listProductQty } = await productService.checkAndUpdateProductQty(
      products,
    );

    let totalPrice = 0;

    const newProduct = listProductQty.map((prod, i) => {
      totalPrice += prod.price * products[i].orderedQty;
      return {
        productId: prod._id,
        qty: products[i].orderedQty,
        price: prod.price,
      };
    });

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
