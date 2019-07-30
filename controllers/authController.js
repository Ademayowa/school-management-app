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
 * @description  Register student
 * @route  POST api/v1/auth/sign-up
 * @returns {Object} data, status code and message porperties
 * @access public
 */
exports.signUp = async (req, res) => {
  try {
    const { isValid, errors } = validateSignUpInput(req.body);
    // Check student input validation
    if (!isValid) return res.status(400).json(errors);

    // Check if email already exist
    const student = await Student.findOne({ email: req.body.email });
    if (student) {
      errors.email = 'Email already exist';
      return res.status(409).json(errors);
    }
    // create new student
    const { username, email, password } = req.body;
    const newStudent = await new Student({
      username,
      email,
      password
    });
    // Hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newStudent.password, salt, (err, hash) => {
        if (err) throw err;
        newStudent.password = hash;
        // Save student
        newStudent.save();
        res
          .json({
            status: 'success',
            data: {
              username,
              email
            },
            msg: 'SignUp Successfully'
          })
          .status(201);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * @description  Login student
 * @route  POST api/v1/auth/sign-in
 * @returns {Object} data and status code
 * @access public
 */
exports.signIn = async (req, res) => {
  try {
    const password = req.body.password;
    // Find student by email
    const student = await Student.findOne({ email: req.body.email });

    const { isValid, errors } = validateSignInInput(req.body);
    // Check validation
    if (!isValid) return res.status(400).json(errors);

    // Check if student exist
    if (!student) {
      errors.email = 'Student not found';
      return res.status(404).json(errors);
    }
    // Compare password
    const passwordMatch = bcrypt.compare(password, student.password);

    if (passwordMatch) {
      const payload = { id: student.id, username: student.username };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        res.json({
          status: 'success',
          token: 'Bearer ' + token,
          msg: 'Login Successfully'
        });
      });
    } else {
      errors.password = 'Password Incorrect';
      return res.status(400).json(errors);
    }
  } catch (err) {
    console.log(err);
  }
};
