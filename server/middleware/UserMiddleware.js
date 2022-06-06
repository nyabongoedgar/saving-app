const { Joi } = require("express-validation");

const userAuthenticationValidation = {
  body: Joi.object({
    email: Joi.string(),
    password: Joi.number().required(),
  }),
};

const userRegistrationValidation = {
  body: Joi.object({
    email: Joi.string(),
    password: Joi.number().required(),
    username: Joi.string().required(),
  }),
};

module.exports = {
  userAuthenticationValidation,
  userRegistrationValidation,
};
