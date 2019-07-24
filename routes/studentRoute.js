const express = require('express');
const router = express.Router();
const passport = require('passport');
// Database
const keys = require('../config/keys');
// Model
const Student = require('../models/Student');

// Student controller methods
const {
  fetchAllStudents,
  getCurrentStudent
} = require('../controllers/studentController');

router.get('/', fetchAllStudents);

// Get a student with a token
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  getCurrentStudent
);

module.exports = router;
