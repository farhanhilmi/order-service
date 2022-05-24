import { validateAddOrder } from '../utils/validation.js';
import productService from './productService.js';

import producer from './kafkaProducer.js';

export default async (userId, products) => {
  // validation
  const { error } = validateAddOrder({ userId, products });
  if (error) throw new Error('make sure the input pattern is correct');

  const { listProductQty } = await productService.checkAndUpdateProductQty(
    products,
  );
  console.log('listProductQty', listProductQty);

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

  return 'successfully published to topic';
};
