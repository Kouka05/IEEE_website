import mongoose from 'mongoose';

export const connectToDb = async (): Promise<void> => {
  const uri = `mongodb+srv://ieeescssalexsc:${process.env.DB_PASSWORD}@ieeealexbranch.ciffu0c.mongodb.net/IEEEAlexBranch?retryWrites=true&w=majority&appName=IEEEAlexBranch`;
  try {
    await mongoose.connect(uri);
    console.log('Mongoose connected');
  } catch (error) {
    console.error('Mongoose connection error:', error);
    throw error;
  }
};