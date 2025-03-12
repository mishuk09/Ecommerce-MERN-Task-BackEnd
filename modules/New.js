const express = require('express');
const app = express.Router();
const NewArrival = require('../Schema/New');



// Read all posts
app.get('/', (req, res) => {
    NewArrival.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Read a single post
app.get('/:id', async (req, res) => {
    try {
        const singleItem = await NewArrival.findById(req.params.id);

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
