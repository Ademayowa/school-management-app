const express = require('express');
const router = express.Router();
const passport = require('passport');
// Database
const keys = require('../config/keys');
// Model
const Student = require('../models/Student');
// Student controller
const studentController = require('../controllers/studentController');

router.get('/all', studentController.fetchAllStudents);
router.post('/sign-up', studentController.signUp);
router.post('/sign-in', studentController.signIn);
// Get a student before token expires
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  studentController.getCurrentStudent
);

module.exports = router;
