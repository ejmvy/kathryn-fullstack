const Joi = require('joi');
const mongoose = require('mongoose');
const {categorySchema} = require('./category');

const Product = mongoose.model('Products', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
    minlength: 2,
    maxlength: 255
  },
  category: { 
    type: categorySchema,  
    required: true
  },
  price: {
    type: Number,
  },
  description: {
      type: String,
  },
  numberInStock: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  colour: {
    type: String,
  },
  dimensions: {
    type: String,
  },
  washing: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  imageUrlArray: {
    type: Array,
  }
}));

function validateProduct(product) {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().required(),
  };

  return Joi.validate(product, schema);
}

exports.Product = Product; 
exports.validate = validateProduct;