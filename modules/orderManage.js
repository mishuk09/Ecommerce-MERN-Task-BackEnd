const express = require('express');
const app = express();
const Order = require('../Schema/Order');

//create order
app.post('/create', async (req, res) => {
    try {
        req.body.payment = true;
        const createOrder = new Order(req.body)
        await createOrder.save();
        res.status(201).json({ message: 'Order create successfully' })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
})
// Fetch orders
app.post('/allorder', async (req, res) => {
    try {
        // Assuming Order is a Mongoose model
        const orders = await Order.find(); // Fetch all orders from the database

        // If no orders found
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        // Send the fetched orders as a response
        res.status(200).json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


module.exports = app;