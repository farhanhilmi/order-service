import { getOrderId } from '../repository/orderRepo.js';

export default async (call, callback) => {
  try {
    const { _id } = call.request;
    const order = await getOrderId(_id);
    if (!order) callback({ code: 5, message: 'order id not found!' });
    callback(null, order);
  } catch (error) {
    callback(error);
  }
};
