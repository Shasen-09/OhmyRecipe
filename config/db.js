const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDb ${mongoose.connection.host}`.bgMagenta);
  } catch (error) {
    console.log(`MongoDB Error: ${error}`)
  }
}

module.exports = connectDB;