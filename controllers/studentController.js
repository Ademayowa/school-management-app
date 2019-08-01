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
 * @returns {Object} data and status code
 * @access public
 */
exports.fetchAllStudents = async (req, res) => {
  try {
    const allStudents = await Student.find().select('username email');
    return res
      .json({
        status: 'success',
        data: allStudents
      })
      .status(200);
  } catch (err) {
    console.log(err);
  }
};
/**
 * @description  Return a signed-in student
 * @route  GET api/v1/students/current
 * @returns {Object} data and status code
 * @access private
 */
exports.getCurrentStudent = (req, res) => {
  return res
    .json({
      status: 'success',
      data: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
      }
    })
    .status(200);
};
