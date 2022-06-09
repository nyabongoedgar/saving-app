const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: false },
    userId: { type: mongoose.Types.ObjectId, required: true },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Savings', savingsSchema);
