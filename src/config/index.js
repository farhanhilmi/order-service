import dotenv from 'dotenv';

dotenv.config();

const {
  HOST,
  SERVER_PORT,
  MONGODB_URI,
  KAFKA_CLIENT_ID,
  KAFKA_BROKERS,
  PRODUCT_GRPC_PORT,
} = process.env;

const config = {
  app: {
    host: `${HOST}:${SERVER_PORT}`,
    port: SERVER_PORT,
  },
  db: {
    uri: MONGODB_URI,
  },
  kafka: {
    CLIENT_ID: KAFKA_CLIENT_ID,
    BROKERS: KAFKA_BROKERS,
  },
  grpc: {
    port: {
      product: `${HOST}:${PRODUCT_GRPC_PORT}`,
    },
  },
};

export default config;
