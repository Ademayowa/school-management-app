const mongoose = require('mongoose');

// DB connection strings
const db = require('./keys').mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true
    });
    console.log('Connected to MongoDB...');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
