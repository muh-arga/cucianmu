const joi = require("joi");

const addItemSchema = joi.object({
  orderId: joi.string().required(),
  type: joi.string().required(),
  serviceId: joi.string().required(),
  amount: joi.number().optional(),
});

module.exports = { addItemSchema };
