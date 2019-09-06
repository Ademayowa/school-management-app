const express = require('express');
const router = express.Router();
const config = require('config');

// Model
const Student = require('../models/Student');

// Student controller methods
const { fetchAllStudents } = require('../controllers/studentController');

router.get('/', fetchAllStudents);

module.exports = router;
