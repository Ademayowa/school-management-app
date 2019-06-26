const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateStudentProfileInput(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.religion = !isEmpty(data.religion) ? data.religion : '';
  data.nameoffather = !isEmpty(data.nameoffather) ? data.nameoffather : '';
  data.nameofmother = !isEmpty(data.nameofmother) ? data.nameofmother : '';
  data.parentemail = !isEmpty(data.parentemail) ? data.parentemail : '';
  data.parentnumber = !isEmpty(data.parentnumber) ? data.parentnumber : '';

  if (!Validator.isLength(data.firstname, { min: 2, max: 40 })) {
    errors.firstname = 'First name must be at least 2 characters';
  }

  if (!Validator.isLength(data.lastname, { min: 2, max: 40 })) {
    errors.lastname = 'Last name must be at least 2 characters';
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = 'First name is required';
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = 'Last name is required';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = 'Gender is required';
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = 'Address is required';
  }

  if (Validator.isEmpty(data.nameoffather)) {
    errors.nameoffather = 'Name of father is required';
  }

  if (Validator.isEmpty(data.nameofmother)) {
    errors.nameofmother = 'Name of mother is required';
  }

  if (Validator.isEmpty(data.parentemail)) {
    errors.parentemail = "Parents' email is required";
  }

  if (Validator.isEmpty(data.parentnumber)) {
    errors.parentnumber = "Parents' phone number is required";
  }

  if (Validator.isEmpty(data.religion)) {
    errors.religion = 'Religion is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
