
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
     await mongoose.connect(process.env.MONGO_URI);
    console.log(`Server connected to Database`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
