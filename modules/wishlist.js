const express = require('express');
const app = express();
const Wishlist = require('../Schema/Wishlist');

// Add item to wishlist
app.post('/add', async (req, res) => {
    const { email, productId } = req.body;
    const existingItem = await Wishlist.findOne({ email, productId });

    if (!existingItem) {
        await Wishlist.create({ email, productId });
        res.json({ message: "Added to Wishlist" })
    } else {
        res.json({ message: "Already in Wishlist" })
    }
});

// Get  wishlist item
app.post("/get", async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const wishList = await Wishlist.find({ email });
    res.json(wishList);
});

// Remove wishlist
app.post("/remove", async (req, res) => {
    const { email, productId } = req.body;
    if (!email || !productId) {
        return res.status(400).json({ message: "Email and productId are required" });
    }
    const deletedItem = await Wishlist.findOneAndDelete({ email, productId });

    if (deletedItem) {
        res.json({ message: "Removed from wishlist" });
    } else {
        res.status(404).json({ message: "Item not found in wishlist" });
    }
});




module.exports = app