import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI } = process.env;

const config = {
  db: {
    uri: MONGODB_URI,
  },
};

export default config;
