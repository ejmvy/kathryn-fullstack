require('dotenv').config();
const config = require('config');

const mongoose = require('mongoose');
const categories = require('./routes/categories');
const products = require('./routes/products');
const orders = require('./routes/orders');
const users = require('./routes/users');
const auth = require('./routes/auth');
const stats = require('./routes/stats');
const payments = require('./routes/payments');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();


// need to set this key before calling node index.js

// export kathryn_jwtPrivateKey=mySecureKey
if (!config.get('jwtPrivateKey')) {
  console.log('Error: JWT is not defined');
  process.exit(1); // 0 is success, anything else is failure
}



mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(helmet());
app.use(cors());
app.options('*', cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self' https://checkout.stripe.com https://js.stripe.com;script-src-attr 'none';frame-src 'self' https://js.stripe.com https://hooks.stripe.com;connect-src 'self' https://api.stripe.com; style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests"
  );
  next();
});


app.use('/api/categories', categories);
app.use('/api/products', products);
app.use('/api/payments', payments);
app.use('/api/orders', orders);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/stats', stats);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/dist/'));
  app.get('*', (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  })
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));