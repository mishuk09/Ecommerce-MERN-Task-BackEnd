const express = require('express');
const app = express();
const Post = require('../Schema/Post');

// Fetch all items
app.get('/items', async (req, res) => {
    try {
        const items = await Post.find();

        if (items.length === 0) { // Check if items array is empty
            return res.status(400).json({ message: 'No items found' });
        }

        res.status(200).json({ items });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


// Fetch single item
app.get('/:id', async (req, res) => {
    try {
        const singleItem = await Post.findById(req.params.id);

        if (!singleItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ singleItem });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
module.exports = app;
