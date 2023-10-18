const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env/.env.developpement' });

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/YStream';

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, mongoOptions);
    console.log('Connection to MongoDB has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to MongoDB:', error);
    throw error;
  }
};

module.exports = { connectToDatabase };
