// VALIDATION
const Joi = require("joi");

// Register Validation

const resisterValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  // Lets Validate the date before we make a user

  return schema.validate(data);
};

// LOGIN VALIDATION

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  // Lets Validate the date before we make a user

  return schema.validate(data);
};

module.exports.resisterValidation = resisterValidation;
module.exports.loginValidation = loginValidation;
