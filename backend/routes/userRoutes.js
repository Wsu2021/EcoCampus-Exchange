const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register route
router.post('/register', async (req, res) => {
    const { username, password, fullName, email, address, phoneNumber } = req.body;

    try {
        await User.create({ username, password, fullName, email, address, phoneNumber });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
