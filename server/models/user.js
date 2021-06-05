const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const {addressSchema} = require('./address');
const {Order} = require('../models/order'); 
const { join } = require('lodash');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
      type: String,
      required: true,
      unique: true,
  },
  password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
  },
  phoneNumber: {
    type: String,
  },
  isAdmin: Boolean,
  userAddress: {
    type: addressSchema,
  },
  createdAt: {
    type: Date,
  }
})

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey')); //need to store in private variable later
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(225).required(),

  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.userSchema = userSchema;
exports.validate = validateUser;