const {CartItem, validate} = require('../models/cartItem'); 
const {Category} = require('../models/category');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const items = await CartItem.find().sort('name');
  res.send(items);
});

router.post('/', async (req, res) => {
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

//   const category = await CartItem.findById(req.body.genreId);
//   if (!category) return res.status(400).send('Invalid category.');

  let newItem = new CartItem({ 
    name: req.body.name,
    // category: {
    //   _id: category._id,
    //   name: category.name
    // },
    price: req.body.price,
    description: req.body.description,
    quantity: req.body.quantity,
    colour: req.body.colourPicked,
    imageUrl: req.body.imageUrl,
    dimensions: req.body.dimensions,
    numberInStock: req.body.numberInStock,
  });
  newItem = await newItem.save();
  
  res.send(newItem);
});

router.put('/:id', async (req, res) => {
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

//   const category = await CartItem.findById(req.body.genreId);
//   if (!category) return res.status(400).send('Invalid category.');

  const updateItem = await CartItem.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
    //   category: {
    //     _id: category._id,
    //     name: category.name
    //   },
      price: req.body.price,
      description: req.body.description,
      quantity: req.body.quantity,
      colour: req.body.colourPicked,
      imageUrl: req.body.imageUrl,
      dimensions: req.body.dimensions,
      numberInStock: req.body.numberInStock,
    }, { new: true });

  if (!updateItem) return res.status(404).send('The product with the given ID was not found.');
  
  res.send(updateItem);
});

router.delete('/:id', async (req, res) => {
  const cartItem = await CartItem.findByIdAndRemove(req.params.id);

  if (!cartItem) return res.status(404).send('The product with the given ID was not found.');

  res.send(cartItem);
});

router.get('/:id', async (req, res) => {
  const cartItem = await CartItem.findById(req.params.id);

  if (!cartItem) return res.status(404).send('The product with the given ID was not found.');

  res.send(cartItem);
});

module.exports = router; 