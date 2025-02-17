const express = require('express');
const app = express();
const port = 5000;
require('dotenv').config();
const mongoose = require('mongoose');
const auth = require('./modules/auth.js');
const items = require('./modules/items');
const orderManage = require('./modules/orderManage');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use('/product', items);
app.use('/order', orderManage);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
