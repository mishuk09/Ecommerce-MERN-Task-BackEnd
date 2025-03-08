const mongoose = require('mongoose');

const wistlist = new mongoose.Schema({
    email: String,
    productId: String
})

module.exports = mongoose.model("Wishlist", wistlist);
