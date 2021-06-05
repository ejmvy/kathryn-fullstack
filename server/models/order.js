const Joi = require('joi');
const mongoose = require('mongoose');
const {cartItemSchema} = require('./cartItem');

const Order = mongoose.model('Order', new mongoose.Schema({
    customer: {
        type: Object,
    },
    orderDate: {
        type: Date,
    },
    products: [
        {
            type: cartItemSchema,
        }
    ],
    cartTotal: {
        type: String
    },
    paymentTotal: {
        type: String,
    },
    orderStatus: {
        type: String,
    },
    isDelivered: {
        type: Boolean,
    },
    orderRef: {
        type: Number,
    },
    deliveredDate: {
        type: Date,
    }
}))

exports.Order = Order; 
