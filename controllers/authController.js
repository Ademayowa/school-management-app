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

    const { username, email, password } = req.body;

    // Check if email already exist
    let student = await Student.findOne({ email });
    if (student) {
      errors.email = 'Email already exist';
      return res.status(409).json(errors);
    }

    // create new student
    student = new Student({
      username,
      email,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);

    student.password = await bcrypt.hash(password, salt);
    // Save student
    await student.save();

    const payload = {
      student: {
        id: student.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '1hr' },
      (err, token) => {
        if (err) throw err;
        res
          .json({
            status: 'success',
            msg: 'Sign up successfully',
            token: token
          })
          .status(201);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Something went wrong!');
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

  const { email, password } = req.body;

  try {
    // Find student by an existing email
    let student = await Student.findOne({ email });
    if (!student) {
      errors.email = 'Invalid credentials!';
      return res.status(400).json(errors);
    }

    // Compare password
    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      errors.password = 'Email or password not correct';
      return res.status(400).json(errors);
    }

    const payload = {
      student: {
        id: student.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '1hr' },
      (err, token) => {
        if (err) throw err;
        res
          .json({
            status: 'success',
            msg: 'Sign in successfully',
            token: token
          })
          .status(200);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Something went wrong!');
  }
};
