const express = require('express');
const app = express();
const Order = require('../Schema/Order');

//create order
app.post('/create', async (req, res) => {
    try {
        const createOrder = new Order(req.body)
        await createOrder.save();
        res.status(201).json({ message: 'Order create successfully' })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
})


module.exports = app;