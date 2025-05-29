const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: 'eco-campus-secret',
  resave: false,
  saveUninitialized: false,
}));


app.use('/users', userRoutes);

app.get('/', (req, res) => {
  if (req.session.user) return res.redirect('/users/profile');
  res.redirect('/users/login');
});

module.exports = app;
