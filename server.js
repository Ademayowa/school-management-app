const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const dbConnect = require('./config/database');
// const studentRoute = require('./routes/students');
const authRoute = require('./routes/auth');
const studentProfileRoute = require('./routes/studentProfile');

const app = express();
const API_PREFIX = '/api/v1';

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// Connect to database
dbConnect();

// Routes
app.use(`${API_PREFIX}/student`, authRoute);
app.use(`${API_PREFIX}/profile`, studentProfileRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
