const { Joi } = require("express-validation");
const SavingsModel = require("../models/SavingsModel");

const savingsValidation = {
  body: Joi.object({
    description: Joi.string(),
    amount: Joi.number().required(),
    date: Joi.date().required(),
  }),
};

// write middleware that will do https://trello.com/c/BuR0YJh7

const validateSavingsDates = (req, res, next) => {
  try {
    const {date} = req.body;
    const dateInCheck = new Date(date)

    // make sure date is not past today
    const ms = new Date(new Date().setHours(0,0,0,0)).getTime() + 172800000;
    const tomorrow = new Date(ms);

    if(dateInCheck >= tomorrow){
      return res.status(403).json({
        message: "You cannot deposit to your savings account for the next day"
      })
    }

    // we fail insert if date is tomorrow
    const today  = new Date(new Date(new Date().setHours(0,0,0,0)).getTime() + 86400000);
  
    // make sure no record for today exists
    const saving = await SavingsModel.findOne({ date: {  $gte: today, $lt: tomorrow }, userId: req.userId})
    if(saving){
      return res.status(403).json({
        message: 'You can only deposit to your savings account once a day'
      })
    } else if( new Date(date) < new Date()){
      return res.status(403).json({
        message: 'You cannot make a deposit for a past date'
      })
    }
    next();
  } catch (error) {
    throw error;
  }
};

module.exports = { savingsValidation, validateSavingsDates };
