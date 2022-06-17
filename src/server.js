import mongoose from 'mongoose';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

// express
import express, { json, urlencoded } from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerDocument from './docs/swaggerSchema.js';

import orderHandler from './handler/orderHandler.js';

import config from './config/index.js';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const PROTO_PATH = './order.proto';

const packageDef = protoLoader.loadSync(PROTO_PATH, options);
const orderPackage = grpc.loadPackageDefinition(packageDef);

const server = new grpc.Server();
server.addService(orderPackage.OrderService.service, {
  createOrder: orderHandler.createOrder,
  validateOrderId: orderHandler.validateOrderId,
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
  config.app.host,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) console.log('Error: ', error);
    server.start();
    console.log(`Server running at ${config.app.host}`);
    app.listen(config.app.port);
  },
);
