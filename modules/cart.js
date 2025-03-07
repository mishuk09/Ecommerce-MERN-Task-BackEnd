const express = require('express');
const app = express();
const Cart = require('../Schema/Cart');


// Add item to cart
app.post('/add', async (req, res) => {
    const { email, productId, title, img, color, size, price, quantity } = req.body;
    const existingItem = await Cart.findOne({ userId: req.userId, productId, color, size });

    if (existingItem) {
        existingItem.quantity += quantity;
        await existingItem.save();
    } else {
        await Cart.create({ email, userId: req.userId, productId, title, img, color, size, price, quantity });
    }

    res.json({ message: "Item added to cart" });
});


// Get cart items (Email is taken from request body)
app.post("/get", async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const cartItems = await Cart.find({ email });
    res.json(cartItems);
});

// Remove item from cart
app.post("/remove", async (req, res) => {
    const { email, productId, color, size } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    await Cart.deleteOne({ email, productId, color, size });
    res.json({ message: "Item removed from cart" });
});

// Clear cart
app.post("/clear", async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    await Cart.deleteMany({ email });
    res.json({ message: "Cart cleared" });
});



module.exports = app