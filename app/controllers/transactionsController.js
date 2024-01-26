const TransactionModel = require("../models/TransactionModel");

const transactionList = async (req, res, next) => {
  try {
    const transactions = await TournamentModel.find({});
    res.send({
      success: true,
      message: "Tournament list generated successfuly",
      data: { transactions },
    });
  } catch (error) {
    next(error);
  }
};

const getTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .send({ error: true, message: "There is no transaction with this id" });
    }
    const transaction = await TransactionModel.findOne({ _id: id });
    if (!transaction) {
      return res
        .status(404)
        .send({ error: true, message: "Transaction not found" });
    }

    return res.send({
      success: true,
      data: { transaction },
    });
  } catch (error) {
    next(error);
  }
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
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        error: true,
        message: "There is no transaction with this id",
      });
    }

    await TransactionModel.deleteOne({ _id: id });
    res.send({
      success: true,
      message: "Transaction deleted successfuly",
    });
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        error: true,
        message: "There is no transaction with this id",
      });
    }

    const { n, nModified } = await TransactionModel.updateOne(
      { _id: id },
      { ...req.body }
    );
    if (n === 0 || nModified === 0) {
      throw new Error("Update failed");
    }
    res.send({
      success: true,
      message: "Transaction updated successfuly",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTransaction,
  transactionList,
  addTransaction,
  deleteTransaction,
  updateTransaction
};
