const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, index: true },
    username: { type: String, required: true },
    password: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
