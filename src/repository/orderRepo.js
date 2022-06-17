import Order from '../models/order.js';

export const getOrderId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findOne({ _id: id });
      resolve(order);
    } catch (err) {
      reject(err);
    }
  });
};
