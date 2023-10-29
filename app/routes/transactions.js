const express = require("express");
const router = express.Router();

const transactionsController = require("../controllers/transactionsController");

router.get("/", transactionsController.transactionList);
router.post("/", transactionsController.addTransaction);
router.delete("/:id", transactionsController.deleteTransaction);

module.exports = router;
