const userRouter = require("./users");
const sessionRouter = require("./sessions");
const { check } = require("express-validator");

module.exports = (app) => {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/session", sessionRouter);
};
