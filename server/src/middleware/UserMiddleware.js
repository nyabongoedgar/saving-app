const { Joi } = require('express-validation');

const userAuthenticationValidation = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const userRegistrationValidation = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  userAuthenticationValidation,
  userRegistrationValidation,
};
