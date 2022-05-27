import Order from '../models/order.js';
import mongoose from 'mongoose';
import createNewOrder from '../service/createNewOrder.js';

const objectID = mongoose.Types.ObjectId;

const orderedProducts = [
  {
    _id: '6244321d37826bd7e91c00da',
    orderedQty: 2,
  },
  {
    _id: '6249656f6d6623c1935bb3c1',
    orderedQty: 1,
  },
];

describe('Order Service | Create New Order', () => {
  it('should throw an error with message of "make sure the input pattern is correct"', async () => {
    const newOrder = await createNewOrder([
      {
        _id: '6244321d37826bd7e91c00da',
        orderedQty: 2,
      },
      {
        _id: '6249656f6d6623c1935bb3c1',
        orderedQty: 1,
      },
    ]);
    console.log('newOrder', newOrder);
    const throwError = () => {
      throw new TypeError(newOrder);
    };
    expect(throwError).toThrow(`Error: make sure the input pattern is correct`);
  });
});
