const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('config');

const auth = require('../middleware/auth');
// Profile model
const Profile = require('../models/Profile');
// Profile validation
const validateStudentProfileInput = require('../validation/studentProfile');

/**
 * @description  Gets current student profile
 * @route  GET api/v1/profile
 * @returns {Object} message, data & status code
 * @access private
 */
exports.getCurrentProfile = async (req, res) => {
  const errors = {};

  try {
    const currentProfile = await Profile.findById(req.student.id).populate(
      'student',
      'username'
    );

    if (!currentProfile) {
      // Student will be redirected to a "create profile page" on the front-end after this error message
      errors.noprofile = 'You do not have a profile yet!';
      return res.status(400).json(errors);
    }

    return res
      .json({
        status: 'success',
        msg: 'Current Student Profile',
        data: currentProfile
      })
      .status(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Something went wrong!');
  }
};

/**
 * @description  Create & Update student profile
 * @route  POST api/v1/profile
 * @returns {Object} message, data & status code
 * @access private
 */
exports.createProfile = async (req, res) => {
  const { errors, isValid } = validateStudentProfileInput(req.body);
  // Validation errors.
  if (!isValid) return res.status(400).json(errors);

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
    profileInputFields.student = req.student.id;

    const profile = await Profile.findOne({ student: req.student.id });
    if (profile) {
      // Update student profile
      let profile = await Profile.findOneAndUpdate(
        { student: req.user.id },
        { $set: profileInputFields },
        { new: true }
      );

      return res
        .json({
          status: 'success',
          msg: 'Profile Updated',
          data: profileInputFields
        })
        .status(200);
    } else {
      // Check if profile already exist
      let profile = await Profile.findOne({
        handle: profileInputFields.handle
      });
      if (profile) {
        errors.handle = 'Profile Already Exist!';
        return res.status(409).json(errors);
      }

      // Save student profile
      await new Profile(profileInputFields).save();
      res
        .json({
          status: 'success',
          msg: 'Profile Saved',
          data: profileInputFields
        })
        .status(201);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong!');
  }
};

/**
 * @description  Get all student profiles
 * @route  GET api/v1/profile/all
 * @returns {Object} message, data & status code
 * @access public
 */
exports.getAllProfiles = async (req, res) => {
  const errors = {};

  try {
    const allProfiles = await Profile.find().select('lastname handle');
    if (!allProfiles) {
      errors.noprofile = 'There are no available profiles';
      return res.status(400).json(errors);
    }

    return res
      .json({
        status: 'success',
        msg: 'All Student Profiles',
        data: allProfiles
      })
      .status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong!');
  }
};

/**
 * @description  Get profile by student Id
 * @route  GET api/v1/profile/student/:student_id
 * @returns {Object} data, message & status code
 * @access public
 */

exports.getStudentById = async (req, res) => {
  const errors = {};

  try {
    const getSingleProfile = await Profile.findOne({
      student: req.params.student_id
    }).populate('student', ['username', 'email']);

    if (!getSingleProfile) {
      errors.noprofile = 'Profile not found!';
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
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found!!' });
    }
    res.status(500).send('Something went wrong!');
  }
};

/**
 * @description  Get profile by handle
 * @route  GET api/v1/profile/handle/:handle
 * @returns {Object} data, message & status code
 * @access public
 */
exports.getProfileHandle = async (req, res) => {
  const errors = {};

  try {
    const profileHandle = await Profile.findOne({
      handle: req.params.handle
    })
      .populate('student', 'username')
      .select('lastname');
    if (!profileHandle) {
      errors.nohandle = 'There is no profile for this student!';
      return res.status(400).json(errors);
    }

    return res
      .json({
        status: 'success',
        msg: 'Student Handle',
        data: profileHandle
      })
      .status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong!');
  }
};
