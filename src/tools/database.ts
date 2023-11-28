import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env/.env.developpement' });

const options: ConnectOptions = {
     bufferCommands: true,
     autoIndex: true,
     autoCreate: true,
};

export const connectToDatabase = async () => {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error("La variable d'environnement MONGO_URI est requise");
  }

  try {
    await mongoose.connect(mongoURI, options);
  } catch (error) {
    console.error('Unable to connect to MongoDB:', error);
    throw error;
  }
};

module.exports = { connectToDatabase };
