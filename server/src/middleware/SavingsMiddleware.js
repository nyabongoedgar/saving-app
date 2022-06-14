/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */

const { Joi } = require('express-validation');
const { DateTime } = require('luxon');
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
  const tomorrow = DateTime.local().plus({ days: 1 });
  const yesterday = DateTime.local().plus({ days: -1 });
  const today = DateTime.local();
  const dateToCheck = new Date(date).toISOString();

  // tomorrow should not be greater or equal to the date in check
  if (
    +DateTime.fromISO(dateToCheck).startOf('day') === +DateTime.fromISO(tomorrow).startOf('day')
    || DateTime.fromISO(dateToCheck).startOf('day') > DateTime.fromISO(tomorrow).startOf('day')
  ) {
    return res.status(400).json({
      message: 'You cannot deposit to your savings account for a future date',
    });
  }

  if (DateTime.fromISO(dateToCheck).startOf('day') <= DateTime.fromISO(yesterday).startOf('day')) {
    return res.status(400).json({
      message: 'You cannot make a deposit for a past date',
    });
  }

  // make sure no record for today exists
  const saving = await SavingsModel.findOne({
    date: {
      $gte: DateTime.fromISO(today).startOf('day').toJSDate(),
      $lt: DateTime.fromISO(tomorrow).startOf('day').toJSDate(),
    },
    userId: req.userId,
  });

  if (saving) {
    return res.status(400).json({
      message: 'You can only deposit to your savings account once a day',
    });
  }
  next();
};

module.exports = { savingsValidation, validateSavingsDates };
