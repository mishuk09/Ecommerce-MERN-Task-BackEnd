const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phoneNumber: String,
    orderNote: String,
    city: String,
    address: String,
    landmark: String,
    payment: Boolean,
    cartItems: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            title: String,
            color: String,
            size: { type: [String], required: false },
            quantity: Number,
            price: Number,
            img: String,
        },
    ],
    totalAmount: Number,
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;