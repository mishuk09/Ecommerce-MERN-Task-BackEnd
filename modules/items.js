const express = require('express');
const app = express();
const Post = require('../Schema/Post');

// Fetch all items
app.get('/allitem', async (req, res) => {
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


// Search products by title
app.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        // Find products where the title contains the search query (case-insensitive)
        const results = await Post.find({ title: { $regex: query, $options: "i" } });

        res.json({ items: results });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ message: "Internal server error" });
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
