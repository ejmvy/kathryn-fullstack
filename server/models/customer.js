const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
      type: String,
      required: true,
  },
  email: {
      type: String,
      required: true,
      unique: true,
  }
}));

function validateCustomer(customer) {
  const schema = {
    firstname: Joi.string().min(5).max(50).required(),
    lastname: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required(),
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer; 
exports.validate = validateCustomer;