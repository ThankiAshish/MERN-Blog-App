const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.MONGODB_URL);

connection
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

module.exports = connection;
