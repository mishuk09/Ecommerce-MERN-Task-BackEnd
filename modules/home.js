const express = require('express');
const app = express();
const homeSchema = require('../Schema/homeSchema');


//read all offer
app.get('/offer', (req, res) => {
    homeSchema.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Read a single post
app.get('/:id', (req, res) => {
    homeSchema.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = app;