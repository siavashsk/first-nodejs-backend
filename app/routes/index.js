const userRouter = require("./users");
const productRouter = require("./products");
const sessionRouter = require("./sessions");
const tournamentRouter = require("./tournaments");
const leagueRouter = require("./leagues");
const auth = require("../middlewares/auth");

module.exports = (app) => {
  app.use("/api/v1/users", [auth], userRouter);
  app.use("/api/v1/session", sessionRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/tournaments", tournamentRouter);
  app.use("/api/v1/leagues", leagueRouter);
};
