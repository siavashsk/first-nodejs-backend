const express = require("express");
const router = express.Router();

const tournamentsController = require("../controllers/tournamentsController");

router.get("/", tournamentsController.tournamentList);
router.get("/:id", tournamentsController.getTournament);
router.post("/", tournamentsController.addTournament);
router.delete("/:id", tournamentsController.deleteTournament);
router.patch("/:id", tournamentsController.updateTournament);

module.exports = router;
