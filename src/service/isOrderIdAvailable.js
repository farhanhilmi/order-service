import { getOrderId } from '../repository/orderRepo.js';

export default async (id) => {
  try {
    const order = await getOrderId(id);
    if (!order) throw new Error('order id not found!');
    return order;
  } catch (err) {
    return err;
  }
};
