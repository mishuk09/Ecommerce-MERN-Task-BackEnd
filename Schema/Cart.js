
const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    email: String,
    userId: String,
    productId: String,
    title: String,
    img: String,
    color: String,
    size: String,
    price: Number,
    quantity: Number,
});

module.exports = mongoose.model('Cart', CartItemSchema);
