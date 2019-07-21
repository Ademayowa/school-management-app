const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const dbConnect = require('./config/database');
const studentRoute = require('./routes/students');
const studentProfileRoute = require('./routes/studentProfile');

const app = express();
const API_PREFIX = '/api/v1';

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to database
dbConnect();

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// Routes
app.use(`${API_PREFIX}/student`, studentRoute);
app.use(`${API_PREFIX}/profile`, studentProfileRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
