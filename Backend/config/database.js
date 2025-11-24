const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_SECRET);
    console.log("Database connection established.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
