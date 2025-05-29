const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');


router.get('/register', (req, res) => {
  res.render('signup', { successMessage: null });
});



router.post('/register', async (req, res) => {
  const { username, password, fullName, email, address, phoneNumber } = req.body;

  try {
    await User.create({ username, password, fullName, email, address, phoneNumber });
    res.redirect('/users/login');
  } catch (error) {
    res.render('signup', { successMessage: `Error: ${error.message}` });
  }
});



router.get('/login', (req, res) => {
  res.render('login', { errorMessage: null });
});




router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByUsername(username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.render('login', { errorMessage: 'Invalid username or password' });
    }

    req.session.user = user;
    res.redirect('/users/profile');
  } catch (error) {
    res.render('login', { errorMessage: 'Login failed. Please try again.' });
  }
});



router.get('/profile', (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.redirect('/users/login');
  }

  res.render('user_detail', { user });
});



router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/users/login');
  });
});

module.exports = router;
