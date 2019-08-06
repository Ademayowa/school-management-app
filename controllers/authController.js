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
 * @returns {Object} message, data and status code
 * @access public
 */
exports.signUp = async (req, res) => {
  const { isValid, errors } = validateSignUpInput(req.body);

  try {
    // Check student input validation
    if (!isValid) return res.status(400).json(errors);

    // Check if email already exist
    const student = await Student.findOne({ email: req.body.email });
    if (student) {
      errors.email = 'Email already exist';
      return res.status(409).json(errors);
    }

    // create new student
    const newStudent = await new Student({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    const { username, email } = req.body;
    // Hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newStudent.password, salt, (err, hash) => {
        if (err) throw err;
        newStudent.password = hash;

        // Save student
        newStudent.save();
        return res
          .json({
            status: 'success',
            msg: 'SignUp Successfully',
            data: {
              username,
              email
            }
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
 * @returns {Object} data, token & status code
 * @access public
 */
exports.signIn = async (req, res) => {
  const { isValid, errors } = validateSignInInput(req.body);
  // Check validation
  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  try {
    // Find student by an existing email
    const student = await Student.findOne({ email: email });
    if (!student) {
      errors.email = 'Student Not Found!';
      return res.status(404).json(errors);
    }

    // Compare password
    const doMatch = await bcrypt.compare(password, student.password);
    if (doMatch) {
      const studentData = {
        id: student.id,
        username: student.username
      };

      // Sign in student
      jwt.sign(
        studentData,
        keys.secretOrKey,
        { expiresIn: '1hr' },
        (err, token) => {
          return res
            .json({
              status: 'success',
              msg: 'Login Succesfully',
              token: 'Bearer ' + token
            })
            .status(200);
        }
      );
    } else {
      errors.password = 'Incorrect Password';
      return res.status(400).json(errors);
    }
  } catch (err) {
    console.log(err);
  }
};
