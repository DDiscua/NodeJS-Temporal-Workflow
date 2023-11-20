import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { LOGGER } from '../logger';

dotenv.config();

const getConnectionString = () => {
  const DB = process.env.MONGO_SRV || 'mongodb://';
  const DB_NAME = process.env.MONGO_DB_NAME || '';
  const USER = process.env.MONGO_USER || '';
  const PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD || '');
  const HOST = process.env.MONGO_HOST || 'localhost';
  const PORT = process.env.MONGO_PORT || '27017';
  const isCloud = process.env.CLOUD || false;

  if (isCloud) {
    return `${DB}${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`;
  }

  return `${DB}${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`;
};

const connectDb = async () => {
  try {
    const dbUrl = getConnectionString();
    mongoose.set('strictQuery', false);
    const mongoDbConnection = await mongoose.connect(dbUrl);
    if (mongoDbConnection.connection.readyState === 1) {
      LOGGER.info(`[connectDb][DB connected succesfully]`, {
        metadata: '',
        sendLog: false,
      });
    } else {
      LOGGER.error(`[connectDb][DB connection failed]`, { metadata: '' });
    }
  } catch (error: any) {
    // setTimeout(connectDb, 5000);
    LOGGER.error(`[connectDb][DB connection failed]`, {
      metadata: { error: error, stack: error.stack.toString() },
    });
  }
};

export { connectDb };
