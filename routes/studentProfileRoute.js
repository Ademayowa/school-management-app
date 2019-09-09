const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getCurrentProfile,
  createProfile,
  getAllProfiles,
  getStudentById,
  getProfileHandle,
  getUniversityEducation
} = require('../controllers/StudentProfileController');

router.get('/', auth, getCurrentProfile);
router.post('/', auth, createProfile);
router.get('/all', getAllProfiles);
router.get('/student/:student_id', getStudentById);
router.get('/handle/:handle', getProfileHandle);
router.post('/education', auth, getUniversityEducation);

module.exports = router;
