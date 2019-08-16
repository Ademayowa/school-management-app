const express = require('express');
const router = express.Router();
const config = require('config');

// Model
const Student = require('../models/Student');
// Auth controller
const { signUp, signIn } = require('../controllers/authController');

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);

module.exports = router;
