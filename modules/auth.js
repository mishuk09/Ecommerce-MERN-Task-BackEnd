const express = require('express');
const bcrypt = require('bcrypt');
const jswt = require('jsonwebtoken');
const Client = require('../Schema/Client')
const app = express();


//signin route
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        //find user by email
        const user = await Client.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid crediential' });
        }

        //validate password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        //generate JWT
        const token = jswt.sign(
            { userId: user._id, emial: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        //  send token ,email and name in resposne
        res.status(200).json({
            token,
            email: user.email,
            name: user.firstName,
            address: user.address
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error')
    }
});

//signup route

app.post('/signup', async (req, res) => {
    try {

        const { firstName, lastName, email, password } = req.body;

        //validate
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create and save user
        const newUser = new Client({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", newUser });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})


module.exports = app;