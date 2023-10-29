const express = require("express");
const router = express.Router();

const leaguesController = require("../controllers/leaguesController");

router.get("/", leaguesController.leagueList);
router.post("/", leaguesController.addLeague);
router.delete("/:id", leaguesController.deleteLeague);

module.exports = router;
