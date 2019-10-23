const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = checkEmpty(data.name);
  data.password = checkEmpty(data.password);
  data.password2 = checkEmpty(data.password2);
  data.email = checkEmpty(data.email);

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters.";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters.";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required.";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password = "Passwords must match.";
  }

  function checkEmpty(value) {
    return isEmpty(value) ? "" : value;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
