const { checkSchema } = require("express-validator");

const userValidation = checkSchema({
  first_name: {
    exists: {
      errorMessage: "First name is required",
      options: { checkFalsy: true },
    },
    isString: { errorMessage: "First name should be string" },
  },
  last_name: {
    exists: {
      errorMessage: "Last name is required",
      options: { checkFalsy: true },
    },
    isString: { errorMessage: "Last name should be string" },
  },
  phone: {
    isString: { errorMessage: "phone number should be string" },
    isLength: {
      options: { min: 11, max: 11 },
      errorMessage: "phone number should be 10 digits",
    },
  },
  email: {
    isEmail: { errorMessage: "Please provide valid email" },
  },
});

module.exports = { userValidation };
