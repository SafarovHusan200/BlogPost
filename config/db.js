const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  mongoose.set("strictQuery", false);
  const connecting = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected to ${connecting.connection.host}`.blue.bold);
};

module.exports = connectDB;
