const TransactionModel = require("../models/TransactionModel");
const { getItemsList, getItem, deleteItem, updateItem } = require("./dynamicController");

const transactionList = async (req, res, next) => {
  getItemsList(req, res, next, "transaction", TransactionModel);
};

const getTransaction = async (req, res, next) => {
  getItem(req, res, next, "transaction", TransactionModel);
};

const addTransaction = async (req, res, next) => {
  try {
    const {
      username,
      mobile,
      product_type,
      description,
      transaction_status,
      amount,
    } = req.body;
    const newTransaction = new TransactionModel({
      username,
      mobile,
      product_type,
      description,
      transaction_status,
      amount,
    });
    await newTransaction.save();
    res.status(201).send({
      success: true,
      message: "New transaction created successfuly",
      newTransaction,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  deleteItem(req, res, next, "transaction", TransactionModel);
};

const updateTransaction = async (req, res, next) => {
  updateItem(req, res, next, "transaction", TransactionModel);
};

module.exports = {
  getTransaction,
  transactionList,
  addTransaction,
  deleteTransaction,
  updateTransaction,
};
