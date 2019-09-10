const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./config/database');
const authRoute = require('./routes/authRoute');
const studentRoute = require('./routes/studentRoute');
const studentProfileRoute = require('./routes/studentProfileRoute');

const app = express();
// Connect database
connectDB();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const API_PREFIX = '/api/v1';
// Routes
app.use(`${API_PREFIX}/auth`, authRoute);
app.use(`${API_PREFIX}/students`, studentRoute);
app.use(`${API_PREFIX}/profile`, studentProfileRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
