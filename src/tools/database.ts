import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env/.env.developpement' });

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("La variable d'environnement MONGO_URI est requise");
}

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
  } catch (error) {
    console.error('Unable to connect to MongoDB:', error);
    throw error;
  }
};

module.exports = { connectToDatabase };
