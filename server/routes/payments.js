const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const calculateOrderAmount = items => {
    let cost = items.reduce((prev, acc) => prev + (acc.qty * acc.price), 0);
    cost = cost + 6.99; //shipping
    cost = cost.toFixed(2).toString().replace('.', '');
    return parseInt(cost);
}

router.post('/create-payment-intent', async (req, res) => {
    const items = req.body.products;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'eur'
    })

    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

module.exports = router;