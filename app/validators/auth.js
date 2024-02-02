const userDataValidate = (req, res, next) => {
  if (!req.body.username) {
    throw Error("username is required");
  }
  if (!req.body.password) {
    throw Error("password is required");
  }
  if (req.body.password.length < 5) {
    throw Error("password should have at least 5 characters");
  }
};

module.exports = { userDataValidate };
