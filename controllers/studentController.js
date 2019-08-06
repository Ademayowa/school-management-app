const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Student model
const Student = require('../models/Student');
// Sign-up validation
const validateSignUpInput = require('../validation/sign-up');
// Sign-in validation
const validateSignInInput = require('../validation/sign-in');
// Database keys
const keys = require('../config/keys');

/**
 * @description  Fetch all students
 * @route  GET api/v1/students
 * @returns {Object} message, data and status code
 * @access public
 */
exports.fetchAllStudents = async (req, res) => {
  try {
    const allStudents = await Student.find().select('username email');
    return res
      .json({
        status: 'success',
        msg: 'Gets All Students',
        data: allStudents
      })
      .status(200);
  } catch (err) {
    console.log(err);
  }
};
