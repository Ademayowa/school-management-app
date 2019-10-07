const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducation(data) {
  let errors = {};

  data.schoolname = !isEmpty(data.schoolname) ? data.schoolname : '';
  data.schooladdress = !isEmpty(data.schooladdress) ? data.schooladdress : '';
  data.country = !isEmpty(data.country) ? data.country : '';
  data.graduationyear = !isEmpty(data.graduationyear)
    ? data.graduationyear
    : '';
  data.grade = !isEmpty(data.grade) ? data.grade : '';
  data.courseofstudy = !isEmpty(data.courseofstudy) ? data.courseofstudy : '';
  data.descriptionofcourse = !isEmpty(data.descriptionofcourse)
    ? data.descriptionofcourse
    : '';

  if (Validator.isEmpty(data.schoolname)) {
    errors.schoolname = 'School name is required';
  }

  if (Validator.isEmpty(data.schooladdress)) {
    errors.schooladdress = 'School addredd is required';
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = 'Country is required';
  }

  if (Validator.isEmpty(data.graduationyear)) {
    errors.graduationyear = 'Graduation year is required';
  }

  if (Validator.isEmpty(data.grade)) {
    errors.grade = 'Grade is required';
  }

  if (Validator.isEmpty(data.courseofstudy)) {
    errors.courseofstudy = 'Course of study is required';
  }

  if (Validator.isEmpty(data.descriptionofcourse)) {
    errors.descriptionofcourse = 'Course decsription is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
