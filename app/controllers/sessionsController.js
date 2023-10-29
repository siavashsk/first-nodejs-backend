const UserModel = require("../models/UserModel");
const TokenService = require("../services/TokenService");

exports.newSession = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({
        status: "error",
        code: 404,
        message: "Username or password is incorrect",
      });
    }
    const token = TokenService.sign({ id: user._id });
    res.send({
      status: "success",
      code: 200,
      token,
    });
  } catch (error) {
    next(error);
  }
};
