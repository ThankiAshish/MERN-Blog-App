const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    min: 4,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    min: 8,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
