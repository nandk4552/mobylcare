const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDB connected to ${conn.connection.host}`.bold.yellow
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.bgRed.white);
    process.exit(1);
  }
};

//exports
module.exports = connectDB;
