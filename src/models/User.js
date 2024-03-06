const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, index: true },
  password: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
