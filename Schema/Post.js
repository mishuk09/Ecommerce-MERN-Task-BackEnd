const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    img: { type: String, required: true },  // Encoded string
    category: { type: String, required: true },
    title: { type: String, required: true },
    newPrice: { type: Number, required: true },
    oldPrice: { type: Number, required: true },
    color: { type: [String], required: false },  // Array of strings
    size: { type: [String], required: false },   // Array of strings
    description: { type: String, required: false },  // Corrected typo
});

const Post = mongoose.model('Post', itemSchema);
module.exports = Post;