const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');

// Profile model
const Profile = require('../models/Profile');
// Profile validation
const validateStudentProfileInput = require('../validation/studentProfile');
// Database keys
const keys = require('../config/keys');

/**
 * @description  Test profile route
 * @route  GET api/v1/profile/test
 * @access public
 */
exports.testProfile = (req, res) => {
  Profile.find().then(profile => {
    res.status(200).json({ msg: 'Profile route!' });
  });
};
/**
 * @description  Get current student profile
 * @route  GET api/v1/profile
 * @returns {Object} message properties and current profile
 * @access private
 */
exports.getCurrentProfile = (req, res) => {
  const errors = {};

  Profile.findOne({ student: req.user.id })
    .populate('student', 'lastname')
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'You do not have a profile yet!';
        return res.status(404).json(errors);
      }
      res.json({
        msg: 'Current Student Profile',
        data: profile
      });
    })
    .catch(err => console.log(err));
};
/**
 * @description  Create & Update student profile
 * @route  POST api/v1/profile
 * @returns {Object} status code and profile data
 * @access private
 */
exports.createProfile = (req, res) => {
  const profileInputFields = {};

  profileInputFields.firstname = req.body.firstname;
  profileInputFields.lastname = req.body.lastname;
  profileInputFields.handle = req.body.handle;
  profileInputFields.gender = req.body.gender;
  profileInputFields.address = req.body.address;
  profileInputFields.religion = req.body.religion;
  profileInputFields.nameoffather = req.body.nameoffather;
  profileInputFields.nameofmother = req.body.nameofmother;
  profileInputFields.parentemail = req.body.parentemail;
  profileInputFields.parentnumber = req.body.parentnumber;
  // Get student token
  profileInputFields.student = req.user.id;

  const { errors, isValid } = validateStudentProfileInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  Profile.findOne({ student: req.user.id }).then(profile => {
    if (profile) {
      // Update student profile
      Profile.findOneAndUpdate(
        { student: req.user.id },
        { $set: profileInputFields },
        { new: true }
      ).then(profile => {
        res.json({
          msg: 'Profile Updated',
          data: profile
        });
      });
    } else {
      // Check if profile already exist
      Profile.findOne({ lastname: profileInputFields.lastname }).then(
        profile => {
          if (profile) {
            errors.profile = 'Profile already exist';
            return res.status(400).json(errors);
          }
          // Save student profile
          new Profile(profileInputFields).save().then(profile => {
            res.json({
              msg: 'Profile Saved',
              data: profile
            });
          });
        }
      );
    }
  });
};
/**
 * @description  Get all student profiles
 * @route  GET api/v1/profile/all
 * @returns {Object} message properties and students profile data
 * @access public
 */
exports.getAllProfiles = (req, res) => {
  const errors = {};

  Profile.find()
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no available profiles';
        return res.status(400).json(errors);
      }
      res.json({
        msg: 'Fetch All Student Profiles',
        data: profiles
      });
    })
    .catch(err => console.log(err));
};
/**
 * @description  Get profile by student Id
 * @route  GET api/v1/profile/student/:student_id
 * @returns {Object} message properties and data
 * @access private
 */
exports.getProfileById = (req, res) => {
  const errors = {};

  Profile.findOne({ student: req.params.student_id })
    .populate('student', ['username', 'email'])
    .then(profile => {
      // This error here only works when the endpoint is tested with the student handle
      if (!profile) {
        errors.noprofile = 'Profile does not exist for this student';
        res.status(400).json(errors);
      }
      res.json({
        msg: 'Success',
        data: profile
      });
    })
    .catch(err => {
      res.status(404).json({ error: 'Profile Not Found' });
    });
};
/**
 * @description  Get profile by handle
 * @route  GET api/v1/profile/handle/:handle
 * @returns {Object} message properties and data
 * @access public
 */
exports.getProfileHandle = (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('student', ['username'])
    .then(handle => {
      if (!handle) {
        errors.nohandle = 'There is no profile for this student';
        return res.status(400).json(errors);
      }
      res.json({
        msg: 'Success',
        data: handle
      });
    })
    .catch(err => console.log(err));
};
