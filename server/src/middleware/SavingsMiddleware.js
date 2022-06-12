/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const { Joi } = require('express-validation');
const SavingsModel = require('../models/SavingsModel');

const savingsValidation = {
  body: Joi.object({
    description: Joi.string(),
    amount: Joi.number().required(),
    date: Joi.date().required(),
  }),
};

const validateSavingsDates = async (req, res, next) => {
  const { date } = req.body;
  const dateInCheck = new Date(date);

  const ms = new Date(new Date().setHours(0, 0, 0, 0)).getTime() + 172800000;
  const tomorrow = new Date(ms);
  const _ms = new Date(new Date().setHours(14, 59, 59, 999)).getTime() - 43200000;
  const yesterday = new Date(_ms);
  // date should not be greater or equal to tomorrow
  if (dateInCheck >= tomorrow) {
    return res.status(400).json({
      message: 'You cannot deposit to your savings account for the next day',
    });
  }

  const today = new Date(
    new Date(new Date().setHours(0, 0, 0, 0)).getTime() + 86400000,
  );

  // make sure no record for today exists
  const saving = await SavingsModel.findOne({
    date: { $gte: today, $lt: tomorrow },
    userId: req.userId,
  });
  if (saving) {
    return res.status(400).json({
      message: 'You can only deposit to your savings account once a day',
    });
  }
  // we have got to make sure that the dateInCheck should not be yesterday or anyother day
  if (dateInCheck <= yesterday) {
    return res.status(400).json({
      message: 'You cannot make a deposit for a past date',
    });
  }
  next();
};

module.exports = { savingsValidation, validateSavingsDates };
