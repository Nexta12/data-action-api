const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    profilPic: String,
    email: String,
    password: String,
    role: { type: String, default: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
