
const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    email: String,
    userId: String,
    productId: String,
    title: String,
    img: String,
    color: String,
    size: { type: [String], required: false },
    price: Number,
    quantity: Number,
});

module.exports = mongoose.model('Cart', CartItemSchema);
