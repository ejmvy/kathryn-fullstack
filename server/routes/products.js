const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Product, validate } = require('../models/product');
const { Category } = require('../models/category');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find().sort('name');
  res.send(products);
});

// [auth, auth]
router.post('/', async (req, res) => {
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.genreId);
  if (!category) return res.status(400).send('Invalid category.');

  let product = new Product({
    name: req.body.name,
    category: {
      _id: category._id,
      name: category.name
    },
    price: req.body.price,
    description: req.body.description,
    numberInStock: req.body.numberInStock,
    colour: req.body.colour,
    dimensions: req.body.dimensions,
    washing: req.body.washing,
    imageUrl: req.body.imageUrl,
    imageUrlArray: req.body.imageUrlArray,
  });
  product = await product.save();

  res.send(product);
});

//  [auth, auth]
router.put('/:id', async (req, res) => {
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.genreId);
  if (!category) return res.status(400).send('Invalid category.');

  const product = await Product.findByIdAndUpdate(req.params.id,
    {
      name: req.body.name,
      category: {
        _id: category._id,
        name: category.name
      },
      price: req.body.price,
      description: req.body.description,
      numberInStock: req.body.numberInStock,
      colour: req.body.colour,
      dimensions: req.body.dimensions,
      washing: req.body.washing,
      imageUrl: req.body.imageUrl,
      imageUrlArray: req.body.imageUrlArray,
    }, { new: true });

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

// , [auth, auth]
router.delete('/:id', async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

router.get('/image/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).send('Product not found.');

  res.send(product.imageUrlArray[0]);
})

router.get('/category/:categoryid', async (req, res) => {

  // const category = await Category.findById();
  const products = await Product.find().sort('name');
  var categoryProducts = [];

  products.forEach(product => {
    if (product.category._id == req.params.categoryid) {
      categoryProducts.push(product);
    }
  });


  res.send(categoryProducts);
});

module.exports = router; 