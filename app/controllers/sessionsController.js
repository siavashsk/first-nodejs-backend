const UserModel = require("../models/UserModel");
const TokenService = require("../services/TokenService");

exports.newSession = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        status: "error",
        code: 404,
        message: "آدرس ایمیل یا کلمه ی عبور اشتباه است",
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
