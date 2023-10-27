const TokenService = require("../services/TokenService");

module.exports = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send({
      status: "error",
      code: 401,
      message: "you are not authorized!",
    });
  }
  const [, tokenValue] = req.headers.authorization.split(" ");
  const token = TokenService.verify(tokenValue);
  if (!token) {
    return res.status(401).send({
      status: "error",
      code: 401,
      message: "your token is not valid!",
    });
  }
  next();
};
