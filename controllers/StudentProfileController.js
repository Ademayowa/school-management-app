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
const validateStudentProfile = require('../validation/studentProfile');
const validateEducationInput = require('../validation/universityEducation');

/**
 * @description  Gets current student profile
 * @route  GET api/v1/profile
 * @returns {Object} message, data & status code
 * @access private
 */
exports.getCurrentProfile = async (req, res) => {
  const errors = {};

  try {
    const profile = await Profile.findOne({
      student: req.student.id
    }).populate('student', 'username');

    if (!profile) {
      // Student will be redirected to a "create profile page" on the front-end after this error message
      errors.noprofile = 'You do not have a profile yet!';
      return res.status(400).json(errors);
    }

    res.status(200).json(profile);
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
  const { errors, isValid } = validateStudentProfile(req.body);
  // Validation errors.
  if (!isValid) return res.status(400).json(errors);

  const {
    firstname,
    lastname,
    handle,
    gender,
    address,
    religion,
    nameoffather,
    nameofmother,
    parentemail
  } = req.body;

  const profileInputFields = {};

  profileInputFields.firstname = firstname;
  profileInputFields.lastname = lastname;
  profileInputFields.handle = handle;
  profileInputFields.gender = gender;
  profileInputFields.address = address;
  profileInputFields.religion = religion;
  profileInputFields.nameoffather = nameoffather;
  profileInputFields.nameofmother = nameofmother;
  profileInputFields.parentemail = parentemail;
  // Get student token
  profileInputFields.student = req.student.id;

  const profile = await Profile.findOne({ student: req.student.id });
  if (profile) {
    // Update student profile
    let profile = await Profile.findOneAndUpdate(
      { student: req.student.id },
      { $set: profileInputFields },
      { new: true }
    );

    return res.status(200).json(profileInputFields);
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
    res.status(201).json(profileInputFields);
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
    const profiles = await Profile.find().select('lastname handle');
    if (!profiles) {
      errors.noprofile = 'There are no available profiles';
      return res.status(400).json(errors);
    }

    res.status(200).json(profiles);
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

    return res.status(200).json(getSingleProfile);
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
    }).populate('student', 'username');

    if (!profileHandle) {
      errors.nohandle = 'There is no profile for this student!';
      return res.status(400).json(errors);
    }

    res.status(200).json(profileHandle);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong!');
  }
};
