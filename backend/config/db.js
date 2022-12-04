const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log("Mongo Connection Error");
    console.log(error);
  }
};

module.exports = connectDB;
