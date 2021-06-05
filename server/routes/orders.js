const {Order} = require('../models/order'); 
const {User} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
const { update } = require('lodash');
const { Product } = require('../models/product');
const router = express.Router();

router.get('/', async (req, res) => {
  const orders = await Order.find().sort('orderDate');

  if (orders)  return res.send(orders);
  else return res.send('There are no orders');
 
});


router.get('/recent', async (req, res) => {
  const orders = await Order.find().sort('orderDate');

  var recentOrders = [];

  orders.forEach(order => {
    if(order.isDelivered === false) {
      recentOrders.push(order);
    }
  })

  if (recentOrders)  return res.send(recentOrders);
  else return res.send('There are no recent orders');
 
});

router.get('/history', async (req, res) => {
  const orders = await Order.find().sort('orderDate');

  var oldOrders = [];

  orders.forEach(order => {
    if(order.isDelivered === true) {
      oldOrders.push(order);
    }
  })

  if (oldOrders)  return res.send(oldOrders);
  else return res.send('There are no old orders');
 
});


router.get('/userhistory/:userId', async (req, res) => {
  const orders = await Order.find().sort('orderDate');

  var userOrders = [];

  orders.forEach(order => {
    if(order.customer._id == req.params.userId) {
      userOrders.push(order);
    }
  })

  if (userOrders)  return res.send(userOrders);
  else return res.send('No orders for this user');
 
});


router.post('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
  })

router.post('/', async (req, res) => {
    // const { error } = validate(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid user.');

    const currentDate =  new Date();
    const orderRef = Math.floor(100000 + Math.random() * 900000);
    const orderStatus = 'Received';
  
    let newOrder = new Order({ 
      customer: {
          _id: user._id,
          name: user.name,
          email: user.email,
          userAddress: user.userAddress,
      },
      products: req.body.products,
      orderDate: currentDate,
      cartTotal: req.body.cartTotal,
      paymentTotal: req.body.paymentTotal,
      orderStatus: orderStatus,
      isDelivered: false,
      orderRef: orderRef,

    });
    newOrder = await newOrder.save();

    res.send(newOrder);

    for (const product of req.body.products) {
      const productFound = await Product.findById(product._id);
      const numberLeft = productFound.numberInStock;
      let updatedProduct = await Product.findByIdAndUpdate(product._id, {
        numberInStock: numberLeft - product.qty,
      });
    }
    
  });



router.put('/:id', async (req, res) => {

  const currentDate =  new Date();
  const order = await Order.findByIdAndUpdate(req.params.id, {
    isDelivered: req.body.isDelivered,
    deliveredDate: currentDate,
    orderStatus: 'On the Way',
  })

  res.send(order);
})


module.exports = router; 