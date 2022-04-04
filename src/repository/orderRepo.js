import Order from '../models/order.js';

export const addNewOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.create(data);
      resolve(order);
    } catch (err) {
      reject(err);
    }
  });
};

export const getOrderId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findOne({ _id: id }, '_id');
      resolve(order);
    } catch (err) {
      reject(err);
    }
  });
};
