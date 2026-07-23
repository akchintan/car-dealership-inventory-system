import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MongoDB connection string is missing');
  }

  await mongoose.connect(mongoUri);
};

export default connectDatabase;
