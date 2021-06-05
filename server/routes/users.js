const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send('User already registered');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user.createdAt = new Date();
  user.isAdmin = false;

  user = await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router; 

router.put('/address/:id', async(req, res) => {
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.params.id, {
    userAddress: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      postcode: req.body.postcode,
      country: req.body.country,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
    }

  })


  if (!user) return res.status(404).send('The User with the given ID was not found.');

  res.send(user);
})

router.put('/:id', async (req, res) => {
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findByIdAndUpdate(req.params.id, {

      name: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,

  });

  user = await user.save();

    if (!user) return res.status(404).send('The User with the given ID was not found.');

  res.send(user);

  
});

// router.delete('/:id', async (req, res) => {
//   const customer = await Customer.findByIdAndRemove(req.params.id);

//   if (!customer) return res.status(404).send('The customer with the given ID was not found.');

//   res.send(customer);
// });

// router.get('/:id', async (req, res) => {
//   const customer = await Customer.findById(req.params.id);

//   if (!customer) return res.status(404).send('The customer with the given ID was not found.');

//   res.send(customer);
// });

