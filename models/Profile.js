const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student'
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  religion: {
    type: String,
    required: true
  },
  nameoffather: {
    type: String,
    required: true
  },
  nameofmother: {
    type: String,
    required: true
  },
  parentemail: {
    type: String,
    required: true
  },
  universityeducation: [
    {
      schoolname: {
        type: String,
        required: true
      },
      schooladdress: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      graduationyear: {
        type: String,
        required: true
      },
      //  upper or lower credit
      grade: {
        type: String,
        required: true
      },
      courseofstudy: {
        type: String,
        required: true
      },
      descriptionofcourse: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', profileSchema);
