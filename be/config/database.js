const mongoose = require("mongoose");
require("dotenv").config(); // access environment variables
const { MongoMemoryServer } = require("mongodb-memory-server");
const { insertData } = require("../utils/dummyData/seeder");

MongoMemoryServer.create().then((server) => {
  const uri = server.getUri();
  console.log(`MongoDB server started at ${uri}`);

  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to an in-memory MongoDB.");

      insertData();
    })
    .catch((err) => {
      console.log(err);
    });
});
