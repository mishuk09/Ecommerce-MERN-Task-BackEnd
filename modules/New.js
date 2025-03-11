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
app.get('/:id', (req, res) => {
    NewArrival.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = app;
