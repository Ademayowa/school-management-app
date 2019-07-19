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
 * @description  Create & Update student profile
 * @route  POST api/v1/profile
 * @returns {Object} status code and profile data
 * @access private
 */
exports.createProfile = async (req, res) => {
  try {
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
    const profile = await Profile.findOne({ student: req.user.id });
    if (profile) {
      // Update student profile
      let profile = await Profile.findOneAndUpdate(
        { student: req.user.id },
        { $set: profileInputFields },
        { new: true }
      );
      res.json({
        msg: 'Profile Updated',
        data: profileInputFields
      });
    } else {
      // Check if profile already exist
      Profile.findOne({ handle: profileInputFields.handle });
      if (profile) {
        errors.profile = 'Profile already exist';
        return res.status(400).json(errors);
      }
      // Save student profile
      new Profile(profileInputFields).save();
      res.json({
        msg: 'Profile Saved',
        data: profileInputFields
      });
    }
  } catch (err) {
    console.log(err);
  }
};
/**
 * @description  Get current student profile
 * @route  GET api/v1/profile
 * @returns {Object} message properties and current profile
 * @access private
 */
exports.getCurrentProfile = async (req, res) => {
  try {
    const errors = {};

    const profile = await Profile.findOne({
      student: req.user.id
    }).populate('student', ['username', 'email']);

    if (!profile) {
      errors.noprofile = 'You do not have a profile yet!';
      return res.status(404).json(errors);
    }
    res.json({
      msg: 'Current Student Profile',
      data: profile
    });
  } catch (err) {
    console.log(err);
  }
};
/**
 * @description  Get all student profiles
 * @route  GET api/v1/profile/all
 * @returns {Object} message properties and students profile data
 * @access public
 */
exports.getAllProfiles = async (req, res) => {
  try {
    const errors = {};

    const profiles = await Profile.find().select('id lastname handle');
    if (!profiles) {
      errors.noprofile = 'There are no available profiles';
      return res.status(400).json(errors);
    }
    res.json({
      msg: 'All Student Profiles',
      data: profiles
    });
  } catch (err) {
    console.log(err);
  }
};
/**
 * @description  Get profile by student Id
 * @route  GET api/v1/profile/student/:student_id
 * @returns {Object} message properties and data
 * @access private
 */
exports.getProfileById = async (req, res) => {
  try {
    const errors = {};

    const profile = await Profile.findOne({
      student: req.params.student_id
    }).populate('student', ['username', 'email']);

    if (!profile) {
      errors.noprofile = 'Profile does not exist for this student';
      res.status(400).json(errors);
    }
    res.json({
      msg: 'Success',
      data: profile
    });
  } catch (err) {
    res.status(404).json({ error: 'Profile Not Found' });
  }
};
/**
 * @description  Get profile by handle
 * @route  GET api/v1/profile/handle/:handle
 * @returns {Object} message properties and data
 * @access public
 */
exports.getProfileHandle = async (req, res) => {
  try {
    const errors = {};

    const handle = await Profile.findOne({
      handle: req.params.handle
    }).populate('student', ['username']);

    if (!handle) {
      errors.nohandle = 'There is no profile for this student';
      return res.status(400).json(errors);
    }
    res.json({
      msg: 'Success',
      data: handle
    });
  } catch (err) {
    console.log(err);
  }
};
