const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const authRoute = require('./routes/authRoute');
const studentRoute = require('./routes/studentRoute');
const studentProfileRoute = require('./routes/studentProfileRoute');

const app = express();

// Connect database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API_PREFIX = '/api/v1';
// Routes
app.use(`${API_PREFIX}/auth`, authRoute);
app.use(`${API_PREFIX}/students`, studentRoute);
app.use(`${API_PREFIX}/profile`, studentProfileRoute);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set a static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
