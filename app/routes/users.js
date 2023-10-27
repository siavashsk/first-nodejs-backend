const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/", usersController.usersList);
router.post("/", usersController.addUser);
router.get("/:id", usersController.getUser);
router.delete("/:id", usersController.deleteUser);
router.patch("/:id", usersController.updateUser);

module.exports = router;
