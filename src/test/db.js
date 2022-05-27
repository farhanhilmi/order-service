import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Order from '../models/order.js';
import config from '../config/index.js';

mongoose.promise = global.Promise;

// let mongoServer;

// const opts = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

const connect = async () => {
  await mongoose.disconnect();
  mongoose.connect(config.db.uri, {
    useNewUrlParser: true,
  });

  // mongoServer = await MongoMemoryServer.create();

  // const mongoUri = await mongoServer.getUri();
  // await mongoose.connect(mongoUri, opts, (err) => {
  //   if (err) {
  //     console.error(err);
  //   }
  // });
};

const close = async () => {
  await mongoose.disconnect();
  // await mongoServer.stop();
};

const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

const addOrderDummy = async () => {
  await Order.create({
    products: [
      {
        productId: '6244321d37826bd7e91c00da',
        qty: 2,
        price: 50000,
      },
      {
        productId: '6249656f6d6623c1935bb3c1',
        qty: 1,
        price: 200000,
      },
    ],
    total: 250000,
  });
};

export default {
  connect,
  close,
  clear,
};
