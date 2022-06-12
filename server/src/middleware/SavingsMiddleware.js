/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */

//rewrite logic with a library


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
  const forwardedDate = new Date(new Date(date).setHours(0, 0, 0, 0)).getTime() + 86400000;
  const dateInCheck = new Date(forwardedDate);
  const ms = new Date(new Date().setHours(0, 0, 0, 0)).getTime() + 172800000;
  const tomorrow = new Date(ms);
  const _ms = new Date(new Date().setHours(14, 59, 59, 999)).getTime() - 43200000;
  const yesterday = new Date(_ms);

  // tomorrow should not be greater or equal to the date in check
  if (+dateInCheck === +tomorrow || +dateInCheck > +tomorrow) {
    return res.status(400).json({
      message: 'You cannot deposit to your savings account for a future date',
    });
  }

  if (dateInCheck <= yesterday) {
    return res.status(400).json({
      message: 'You cannot make a deposit for a past date',
    });
  }

  const today = new Date(
    new Date(new Date().setHours(0, 0, 0, 0)).getTime() + 86400000,
  );

  console.log(today, 'todat')
  // make sure no record for today exists
  const saving = await SavingsModel.findOne({
    date: { $lte: today },
    userId: req.userId,
  });

  // we have got to make sure that the dateInCheck should not be yesterday or anyother day
  console.log(saving, 'saving')
  if (saving) {
    return res.status(400).json({
      message: 'You can only deposit to your savings account once a day',
    });
  }
  req.body.date = forwardedDate;
  next();
};

module.exports = { savingsValidation, validateSavingsDates };
