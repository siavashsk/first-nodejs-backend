const express = require("express");
const router = express.Router();
const controller = require("../controllers/sessionsController");
const { userDataValidate } = require("../validators/auth");

router.post("/signin", userDataValidate, controller.newSession);

module.exports = router;
