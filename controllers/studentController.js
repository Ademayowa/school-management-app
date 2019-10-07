const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Student model
const Student = require('../models/Student');
// Sign-up validation
const validateSignUpInput = require('../validation/sign-up');
// Sign-in validation
const validateSignInInput = require('../validation/sign-in');

/**
 * @description  Fetch all students
 * @route  GET api/v1/students
 * @returns {Object} message, data and status code
 * @access public
 */
exports.fetchAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('username email');
    return res
      .json({
        status: 'success',
        msg: 'Gets All Students',
        data: students
      })
      .status(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Something went wrong!');
  }
};
