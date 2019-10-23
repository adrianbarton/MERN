const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.password = checkEmpty(data.password);
  data.email = checkEmpty(data.email);

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  function checkEmpty(value) {
    return isEmpty(value) ? "" : value;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
