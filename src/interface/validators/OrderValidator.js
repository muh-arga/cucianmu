const joi = require("joi");

const updateOrderSchema = joi.object({
  customerName: joi.string().required(),
  customerPhone: joi.string().optional(),
  estDone: joi.date().required(),
  paymentStatus: joi.number().required(),
  paymentMethod: joi.string().optional(),
  paid: joi.number().optional(),
});

const doneOrderSchema = joi.object({
  paymentStatus: joi.number().required(),
  paymentMethod: joi.string().required(),
  paid: joi.number().required(),
});

module.exports = { updateOrderSchema, doneOrderSchema };
