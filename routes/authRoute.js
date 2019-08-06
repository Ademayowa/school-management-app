const express = require('express');
const router = express.Router();
const passport = require('passport');

// Database
const keys = require('../config/keys');
// Model
const Student = require('../models/Student');
// Auth controller
const {
  signUp,
  signIn,
  getCurrentStudent
} = require('../controllers/authController');

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);

module.exports = router;
