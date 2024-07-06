require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI;
    if (url) {
      await mongoose.connect(url);
      console.log("mongodb connection successful!");
    }
  } catch (err) {
    console.log("mongodb connection failed!", err.message);
  }
};

module.exports = connectDB;
