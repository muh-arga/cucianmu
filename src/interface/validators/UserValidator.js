const joi = require("joi");

const changePasswordSchema = joi.object({
  password: joi.string().required(),
  newPassword: joi.string().min(6).required(),
  newPasswordConfirmation: joi
    .string()
    .valid(joi.ref("newPassword"))
    .required(),
});

const requestResetPasswordSchema = joi.object({
  email: joi.string().email().required(),
});

const resetPasswordSchema = joi.object({
  token: joi.string().required(),
  newPassword: joi.string().min(6).required(),
  newPasswordConfirmation: joi
    .string()
    .valid(joi.ref("newPassword"))
    .required(),
});

module.exports = {
  changePasswordSchema,
  requestResetPasswordSchema,
  resetPasswordSchema,
};
