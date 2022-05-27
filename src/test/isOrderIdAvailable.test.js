import Order from '../models/order.js';
import isOrderIdAvailable from '../service/isOrderIdAvailable.js';
import mongoose from 'mongoose';

const objectID = mongoose.Types.ObjectId;

describe('Order Service | Check Is OrderID Available', () => {
  it('return object of order data with property _id, products, total, userId', async () => {
    const fetchOrder = await Order.findOne(
      {},
      {},
      { sort: { createdDate: -1 } },
    );

    const order = await isOrderIdAvailable(fetchOrder._id);
    expect(order).toBeInstanceOf(Object);
    expect(order._id).toBeTruthy();
    expect(order.products).toBeTruthy();
    expect(order.total).toBeTruthy();
    expect(order.userId).toBeTruthy();
  });

  it('should throw an error with message of "order id not found"', async () => {
    const order = await isOrderIdAvailable(new objectID());
    console.log('order', order);
    const throwError = () => {
      throw new TypeError(order);
    };
    expect(throwError).toThrow(`Error: order id not found`);
  });
});
