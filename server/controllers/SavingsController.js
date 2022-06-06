const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SavingsModel = require("../models/SavingsModel");

const createSaving = async (req, res, next) => {
  try {
    const { amount, description, date } = req.body;
    const result = await SavingsModel.create({
      amount,
      description,
      date: new Date(date),
      userId: req.userId,
    });
    res
      .status(201)
      .json({ saving: result, message: "Saving created successfully" });
  } catch (error) {
    next(error);
  }
};

const getSavings = async (req, res, next) => {
  try {
    const results = await SavingsModel.find({
      userId: req.userId,
    });
    res
      .status(201)
      .json({ savings: results, message: "Savings retrieved successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSaving,
  getSavings,
};
