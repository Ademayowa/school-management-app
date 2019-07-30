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
 * @returns {Object} data, message properties and status code
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
      res
        .json({
          status: 'success',
          data: profileInputFields,
          msg: 'Profile Updated'
        })
        .status(200);
    } else {
      // Check if profile already exist
      Profile.findOne({ handle: profileInputFields.handle });
      if (profile) {
        errors.profile = 'Profile already exist';
        return res.status(409).json(errors);
      }
      // Save student profile
      await new Profile(profileInputFields).save();
      res
        .json({
          status: 'success',
          data: profileInputFields,
          msg: 'Profile Saved'
        })
        .status(200);
    }
  } catch (err) {
    console.log(err);
  }
};
/**
 * @description  Get current student profile
 * @route  GET api/v1/profile
 * @returns {Object} data, message properties and status code
 * @access private
 */
exports.getCurrentProfile = async (req, res) => {
  try {
    const errors = {};

    const currentProfile = await Profile.findOne({
      student: req.user.id
    }).populate('student', ['username', 'email']);

    if (!currentProfile) {
      errors.noprofile = 'You do not have a profile yet!';
      return res.status(404).json(errors);
    }
    return res
      .json({
        status: 'success',
        data: currentProfile,
        msg: 'Current Student Profile'
      })
      .status(200);
  } catch (err) {
    console.log(err);
  }
};
/**
 * @description  Get all student profiles
 * @route  GET api/v1/profile/all
 * @returns {Object} data, message properties and status code
 * @access public
 */
exports.getAllProfiles = async (req, res) => {
  try {
    const errors = {};

    const allProfiles = await Profile.find().select('lastname handle');
    if (!allProfiles) {
      errors.noprofile = 'There are no available profiles';
      return res.status(400).json(errors);
    }
    return res
      .json({
        status: 'success',
        data: allProfiles,
        msg: 'All Student Profiles'
      })
      .status(200);
  } catch (err) {
    console.log(err);
  }
};
/**
 * @description  Get profile by student Id
 * @route  GET api/v1/profile/student/:student_id
 * @returns {Object} data, message properties and status code
 * @access public
 */
exports.getProfileById = async (req, res) => {
  try {
    const errors = {};

    const getSingleProfile = await Profile.findOne({
      student: req.params.student_id
    }).populate('student', ['username', 'email']);

    // Error handler not working yet.
    if (!getSingleProfile) {
      errors.noprofile = 'No profile for this student';
      return res.status(400).json(errors);
    }
    return res
      .json({
        status: 'success',
        data: getSingleProfile,
        msg: 'Get Student Profile'
      })
      .status(200);
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * @description  Get profile by handle
 * @route  GET api/v1/profile/handle/:handle
 * @returns {Object} data, message properties and status code
 * @access public
 */
exports.getProfileHandle = async (req, res) => {
  try {
    const errors = {};

    const profileHandle = await Profile.findOne({
      handle: req.params.handle
    })
      .populate('student', ['username'])
      .select('lastname ');

    if (!profileHandle) {
      errors.nohandle = 'There is no profile for this student';
      return res.status(400).json(errors);
    }
    return res
      .json({
        status: 'success',
        data: profileHandle,
        msg: 'Student Profile Handle or Username'
      })
      .status(200);
  } catch (err) {
    console.log(err);
  }
};
