// const Joi = require('joi');
// const string = require('joi/lib/types/string');
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 50
    },
    addressLine1: {
        type: String,
    },
    addressLine2: {
        type: String,
    },
    city: {
        type: String,
    },
    postcode: {
        type: String,
    },
    country: {
        type: String,
    },
    phoneNumber: {
        type: String,
        minlength: 10,
    },
    email: {
        type: String,
    }
})

const Address = mongoose.model('Address', addressSchema);

exports.addressSchema = addressSchema;
// exports.Address = Address;