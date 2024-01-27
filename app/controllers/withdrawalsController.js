const WithdrawalModel = require("../models/withdrawalModel");
const {
  getItemsList,
  getItem,
  deleteItem,
  updateItem,
} = require("./dynamicController");

const withdrawalList = async (req, res, next) => {
  getItemsList(req, res, next, "withdrawal", WithdrawalModel);
};

const getWithdrawal = async (req, res, next) => {
  getItem(req, res, next, "withdrawal", WithdrawalModel);
};

const addWithdrawal = async (req, res, next) => {
  try {
    const { username, mobile, transaction_status, amount } = req.body;
    const newWithdrawal = new WithdrawalModel({
      username,
      mobile,
      transaction_status,
      amount,
    });
    await newWithdrawal.save();
    res.status(201).send({
      success: true,
      message: "New withdrawal created successfuly",
      newWithdrawal,
    });
  } catch (error) {
    next(error);
  }
};

const deleteWithdrawal = async (req, res, next) => {
  deleteItem(req, res, next, "withdrawal", WithdrawalModel);
};

const updateWithdrawal = async (req, res, next) => {
  updateItem(req, res, next, "withdrawal", WithdrawalModel);
};

module.exports = {
  getWithdrawal,
  withdrawalList,
  addWithdrawal,
  deleteWithdrawal,
  updateWithdrawal,
};
