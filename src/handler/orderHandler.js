import grpc from '@grpc/grpc-js';

import isOrderIdAvailable from '../service/isOrderIdAvailable.js';
import creataNewOrder from '../service/createNewOrder.js';

const validateOrderId = async (call, callback) => {
  try {
    const { _id } = call.request;
    const order = await isOrderIdAvailable(_id);

    callback(null, order);
  } catch (error) {
    if (error instanceof Error) {
      callback({ code: 5, message: error.message });
    }
    callback(error);
  }
};

const createOrder = async (call, callback) => {
  try {
    const { userId, products } = call.request;

    const status = await creataNewOrder(userId, products);

    if (!status) {
      callback({
        code: 3,
        message: status.message,
        status: grpc.status.INVALID_ARGUMENT,
      });
    }

    callback(null, { status });
  } catch (err) {
    console.log(err);
    callback(err);
  }
};

export default { validateOrderId, createOrder };
