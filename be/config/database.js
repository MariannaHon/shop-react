const mongoose = require("mongoose");
require("dotenv").config(); // ensure .env is loaded

const { insertData } = require("../utils/dummyData/seeder");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas.");
    insertData();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
