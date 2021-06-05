const Joi = require('joi');
const mongoose = require('mongoose');
// const {categorySchema} = require('./category');

const cartItemSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  price: {
    type: Number,
  },
  description: {
      type: String,
  },
  qty: {
    type: Number,
  },
  colourSelected: {
    type: String,
  },
  category: {
    type: Object,
  }
});



// exports.CartItem = CartItem; 
exports.cartItemSchema = cartItemSchema;
// exports.validate = validateProduct;