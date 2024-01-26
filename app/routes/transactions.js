const express = require("express");
const router = express.Router();

const transactionsController = require("../controllers/transactionsController");

router.get("/", transactionsController.transactionList);
router.get("/:id", transactionsController.getTransaction);
router.post("/", transactionsController.addTransaction);
router.delete("/:id", transactionsController.deleteTransaction);
router.patch("/:id", transactionsController.updateTransaction);

module.exports = router;
