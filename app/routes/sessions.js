const express = require("express");
const router = express.Router();
const controller = require("../controllers/sessionsController");

router.post('/signin', controller.newSession)

module.exports = router;
