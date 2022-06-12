const mongoose = require('mongoose');
const SavingsModel = require('../models/SavingsModel');

const createSaving = async (req, res, next) => {
  try {
    const { amount, description, date } = req.body;
    const result = await SavingsModel.create({
      amount,
      description,
      date: new Date(date),
      userId: mongoose.Types.ObjectId(req.userId),
    });
    res
      .status(201)
      .json({ saving: result, message: 'Saving created successfully' });
  } catch (error) {
    next(error);
  }
};

const getSavings = async (req, res, next) => {
  try {
    const results = await SavingsModel.find({
      userId: req.userId,
    });
    res.status(200).json({ savings: results });
  } catch (error) {
    next(error);
  }
};

const getSaving = async (req, res, next) => {
  try {
    const saving = await SavingsModel.findOne({
      id: mongoose.Types.ObjectId(req.params.id),
      userId: req.userId,
    });
    res.status(200).json({ saving });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createSaving,
  getSavings,
  getSaving,
};
