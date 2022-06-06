const { Joi } = require("express-validation");

const savingsValidation = {
  body: Joi.object({
    description: Joi.string(),
    amount: Joi.number().required(),
    date: Joi.date().required(),
  }),
};

// write middleware that will do https://trello.com/c/BuR0YJh7

module.exports = { savingsValidation };
