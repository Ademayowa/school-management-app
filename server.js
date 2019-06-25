const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const multer = require('multer');
const studentRoute = require('./routes/students');
const studentProfileRoute = require('./routes/studentProfile');

const app = express();
const API_PREFIX = '/api/v1';

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer().single('image'));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// Routes
app.use(`${API_PREFIX}/student`, studentRoute);
app.use(`${API_PREFIX}/profile`, studentProfileRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
