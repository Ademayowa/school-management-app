const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSignin(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Insert your email';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Insert your password';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
