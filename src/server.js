import mongoose from 'mongoose';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

import createOrder from './service/createOrder.js';
import validateOrderId from './service/validateOrderId.js';

import config from './config/index.js';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const PROTO_PATH = './order.proto';

const packageDef = protoLoader.loadSync(PROTO_PATH, options);
const orderPackage = grpc.loadPackageDefinition(packageDef);

const server = new grpc.Server();
server.addService(orderPackage.OrderService.service, {
  createOrder,
  validateOrderId,
});

mongoose.connect(config.db.uri, {
  useNewUrlParser: true,
});

mongoose.connection.on('open', () => {
  console.log('Connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongo connection error: ${err.message}`);
});

server.bindAsync(
  '127.0.0.1:8001',
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) console.log('Error: ', error);
    console.log(`Server running at http://127.0.0.1:${port}`);
    server.start();
  },
);
