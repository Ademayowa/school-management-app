const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  getCurrentProfile,
  createProfile,
  getAllProfiles,
  getProfileById,
  getProfileHandle
} = require('../controllers/StudentProfileController');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  getCurrentProfile
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createProfile
);
router.get('/all', getAllProfiles);
router.get('/student/:student_id', getProfileById);
router.get('/handle/:handle', getProfileHandle);

module.exports = router;
