const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSignup(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.username, { min: 3, max: 25 })) {
    errors.username = 'Username must be between 3 and 25 characters';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Insert your email';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Insert your password';
  }

  if (!Validator.isLength(data.password, { min: 8, max: 25 })) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Insert your password';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Incorrect password';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
