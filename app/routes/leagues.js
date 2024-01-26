const express = require("express");
const router = express.Router();

const leaguesController = require("../controllers/leaguesController");

router.get("/", leaguesController.leagueList);
router.post("/", leaguesController.addLeague);
router.get("/:id", leaguesController.getLeague);
router.delete("/:id", leaguesController.deleteLeague);
router.patch("/:id", leaguesController.updateLeague);

module.exports = router;
