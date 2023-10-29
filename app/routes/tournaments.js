const express = require("express");
const router = express.Router();

const tournamentsController = require("../controllers/tournamentsController");

router.get("/", tournamentsController.tournamentList);
router.post("/", tournamentsController.addTournament);
router.delete("/:id", tournamentsController.deleteTournament);

module.exports = router;
