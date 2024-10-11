const joi = require("joi");

const registerSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  passwordConfirmation: joi.string().valid(joi.ref("password")).required(),
  name: joi.string().required(),
  phone: joi.string().required(),
  address: joi.string().required(),
});

const updateSchema = joi.object({
  name: joi.string(),
  phone: joi.string(),
  address: joi.string(),
  image: joi.string(),
});

module.exports = { registerSchema, updateSchema };
