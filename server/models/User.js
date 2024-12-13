const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    profilPic: String,
    email: String,
    password: String,
    role: { type: String, enum: ['Super Admin', 'Admin', 'Staff', 'Editor', 'Accounts'], default: "Staff" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
