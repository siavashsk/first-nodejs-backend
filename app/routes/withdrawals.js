const express = require("express");
const router = express.Router();

const withdrawalsController = require("../controllers/withdrawalsController");

router.get("/", withdrawalsController.withdrawalList);
router.post("/", withdrawalsController.addWithdrawal);
router.delete("/:id", withdrawalsController.deleteWithdrawal);

module.exports = router;
