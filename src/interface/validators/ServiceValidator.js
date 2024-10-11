const joi = require("joi");

const addServiceSchema = joi.object({
  name: joi.string().required(),
  type: joi.string().required(),
  price: joi.number().required(),
  estimate: joi.string().optional(),
  ironed: joi.boolean().optional(),
});

module.exports = { addServiceSchema };
