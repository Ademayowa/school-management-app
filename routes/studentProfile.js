const express = require('express');
const router = express.Router();
const passport = require('passport');
const profileController = require('../controllers/profileController');

router.get('/test-profile', profileController.testProfile);
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  profileController.getCurrentProfile
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  profileController.createProfile
);
router.get('/all', profileController.getAllProfiles);
router.get('/student/:student_id', profileController.getProfileById);
router.get('/handle/:handle', profileController.getProfileHandle);

module.exports = router;
