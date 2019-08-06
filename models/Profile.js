const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student'
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
  parentnumber: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', profileSchema);
