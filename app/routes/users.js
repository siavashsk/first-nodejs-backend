const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { body } = require("express-validator");
const { userValidation } = require("../validations/user");

router.get("/", usersController.usersList);
router.post("/", userValidation, usersController.addUser);
router.get("/:id", usersController.getUser);
router.delete("/:id", usersController.deleteUser);
router.patch("/:id", usersController.updateUser);

module.exports = router;
