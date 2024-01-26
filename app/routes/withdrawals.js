const express = require("express");
const router = express.Router();

const withdrawalsController = require("../controllers/withdrawalsController");

router.get("/", withdrawalsController.withdrawalList);
router.get("/:id", withdrawalsController.getWithdrawal)
router.post("/", withdrawalsController.addWithdrawal);
router.delete("/:id", withdrawalsController.deleteWithdrawal);
router.patch("/:id", withdrawalsController.updateWithdrawal)

module.exports = router;
