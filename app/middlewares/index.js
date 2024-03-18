const bodyParser = require("body-parser");
const cors = require("cors");
const expressValidator = require("express-validator");

module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(expressValidator());
};
