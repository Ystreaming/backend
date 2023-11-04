const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env/.env.developpement' });

const mongoURI = process.env.MONGO_URI;

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, mongoOptions);
  } catch (error) {
    console.error('Unable to connect to MongoDB:', error);
    throw error;
  }
};

module.exports = { connectToDatabase };
