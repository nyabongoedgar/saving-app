const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, index: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
