const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
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
 * @description  Test student route
 * @route  GET api/v1/student/test
 * @access public
 */
exports.test = (req, res) => {
  Student.find()
    .then(student => {
      res.status(200).json({ msg: 'Test student route' });
    })
    .catch(err => console.log(err));
};
/**
 * @description  Fetch all student
 * @route  GET api/v1/student/all
 * @returns {Object} message properties and students data
 * @access public
 */
exports.fetchAllStudents = (req, res) => {
  Student.find()
    .select('id username email')
    .then(students => {
      res.status(200).json({
        msg: 'All Students',
        data: students
      });
    })
    .catch(err => console.log(err));
};
/**
 * @description  Register student
 * @route  POST api/v1/student/sign-up
 * @returns {Object} message properties and student data
 * @access public
 */
exports.signUp = (req, res) => {
  const { isValid, errors } = validateSignUpInput(req.body);
  // Check validation
  if (!isValid) return res.status(400).json(errors);

  // Check if email already exist
  Student.findOne({ email: req.body.email }).then(student => {
    if (student) {
      errors.email = 'Email already exist';
      return res.status(400).json(errors);
    }
    // create new student
    const { username, email, password } = req.body;
    const newStudent = new Student({
      username,
      email,
      password
    });
    // Hash password
    bycrypt.genSalt(10, (err, salt) => {
      bycrypt.hash(newStudent.password, salt, (err, hash) => {
        if (err) throw err;
        newStudent.password = hash;
        // Save student
        newStudent
          .save()
          .then(student => {
            res.status(201).json({
              msg: 'Success',
              data: {
                username,
                email
              }
            });
          })
          .catch(err => console.log(err));
      });
    });
  });
};
/**
 * @description  Login student
 * @route  POST api/v1/student/sign-in
 * @returns {Object} message properties and student token
 * @access public
 */
exports.signIn = (req, res) => {
  const password = req.body.password;
  // Find student by email
  Student.findOne({ email: req.body.email }).then(student => {
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
    bycrypt.compare(password, student.password).then(passwordMatch => {
      if (passwordMatch) {
        //res.json({ msg: 'Correct password' });
        const payload = { id: student.id, username: student.username };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              msg: 'Success',
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password Incorrect';
        return res.status(400).json({
          data: student
        });
      }
    });
  });
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
