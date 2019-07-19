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
 * @description  Fetch all student
 * @route  GET api/v1/student/all
 * @returns {Object} message properties and students data
 * @access public
 */
exports.fetchAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('id username email');
    res.status(200).json({
      msg: 'All Students',
      data: students
    });
  } catch (err) {
    console.log(err);
  }
};
/**
 * @description  Register student
 * @route  POST api/v1/student/sign-up
 * @returns {Object} message properties and student data
 * @access public
 */
exports.signUp = async (req, res) => {
  try {
    const { isValid, errors } = validateSignUpInput(req.body);
    // Check validation
    if (!isValid) return res.status(400).json(errors);

    // Check if email already exist
    const student = await Student.findOne({ email: req.body.email });
    if (student) {
      errors.email = 'Email already exist';
      return res.status(400).json(errors);
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
        res.status(201).json({
          msg: 'Success',
          data: {
            username,
            email
          }
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};
/**
 * @description  Login student
 * @route  POST api/v1/student/sign-in
 * @returns {Object} message properties and student token
 * @access public
 */
exports.signIn = async (req, res) => {
  try {
    const password = req.body.password;
    // Find student by email
    const student = await Student.findOne({ email: req.body.email });
    const { isValid, errors } = validateSignInInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Check if student exist
    if (!student) {
      errors.email = 'Student not found';
      return res.status(400).json(errors);
    }
    // Compare password
    const passwordMatch = await bcrypt.compare(password, student.password);

    if (passwordMatch) {
      const payload = { id: student.id, username: student.username };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        res.json({
          msg: 'Success',
          token: 'Bearer ' + token
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
/**
 * @description  Return a student
 * @route  GET api/v1/student/current
 * @returns {Object} student data
 * @access private
 */
exports.getCurrentStudent = (req, res) => {
  //console.log(req.user);
  res.json({
    id: req.user.id,
    username: req.user.id,
    email: req.user.email
  });
};
