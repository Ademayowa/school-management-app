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

//  @route      GET api/v1/test
//  @desc       Test profile route
//  @access     Public
exports.testProfile = (req, res) => {
  Profile.find({}).then(profile => {
    res.status(200).json({ msg: 'Profile route!' });
  });
};

//  @route      GET api/v1/profile
//  @desc       Get current student profile
// @access      Private
exports.getCurrentProfile = (req, res) => {
  Profile.findOne({ student: req.user.id })
    .populate('student', 'lastname')
    .then(profile => {
      if (!profile) {
        res.status(404).json({ msg: 'You don not have a profile yet!' });
      } else {
        res.status(200).json({ msg: 'Welcome back' });
      }
    })
    .catch(err => console.log(err));
};

//  @route      POST api/v1/profile
//  @desc       Create student profile
// @access      Private
exports.createProfile = (req, res) => {
  const profileInputFields = {};

  profileInputFields.firstname = req.body.firstname;
  profileInputFields.lastname = req.body.lastname;
  profileInputFields.gender = req.body.gender;
  profileInputFields.address = req.body.address;
  // profileInputFields.addmissiondate = req.body.addmissiondate;
  profileInputFields.religion = req.body.religion;
  profileInputFields.nameoffather = req.body.nameoffather;
  profileInputFields.nameofmother = req.body.nameofmother;
  profileInputFields.parentemail = req.body.parentemail;
  profileInputFields.parentnumber = req.body.parentnumber;
  // Get student token
  profileInputFields.student = req.user.id;

  const { errors, isValid } = validateStudentProfileInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  Profile.findOne({ student: req.user.id }).then(profile => {
    if (profile) {
      // Update student profile if it already exits
      Profile.findOneAndUpdate(
        { student: req.user.id },
        { $set: profileInputFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // Check if profile already exist
      Profile.findOne({ lastname: profileInputFields.lastname }).then(
        profile => {
          if (profile) {
            errors.lastname = 'That profile already exists';
            return res.status(400).json(errors);
          }
          // Save student profile
          new Profile(profileInputFields)
            .save()
            .then(profile => res.json(profile));
        }
      );
    }
  });
};
