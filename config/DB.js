const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MongoDBUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connect");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
