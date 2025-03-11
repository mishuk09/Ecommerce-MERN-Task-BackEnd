const express = require('express');
const app = express();
const cors = require('cors')
const port = 5000;
require('dotenv').config();
const mongoose = require('mongoose');
const auth = require('./modules/auth.js');
const items = require('./modules/items');
const orderManage = require('./modules/orderManage');
const cart = require('./modules/cart');
const wishlist = require('./modules/wishlist');
const home = require('./modules/home');
const Category = require('./modules/Category');
const New = require('./modules/New');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors policy
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
// MongoDB connection
mongoose.connect(process.env.CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


//imported route implement
app.use('/auth', auth);
app.use('/items', items);
app.use('/order', orderManage);
app.use('/cart', cart);
app.use('/wishlist', wishlist);
app.use('/home', home);
app.use('/cate', Category);
app.use('/new', New);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
