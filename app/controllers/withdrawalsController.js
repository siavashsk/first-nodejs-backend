const WithdrawalModel = require("../models/withdrawalModel");
const { getItemsList, getItem, deleteItem } = require("./dynamicController");

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
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        error: true,
        message: "There is no withdrawal with this id",
      });
    }

    const { n, nModified } = await WithdrawalModel.updateOne(
      { _id: id },
      { ...req.body }
    );
    if (n === 0 || nModified === 0) {
      throw new Error("Update failed");
    }
    res.send({
      success: true,
      message: "Withdrawal updated successfuly",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWithdrawal,
  withdrawalList,
  addWithdrawal,
  deleteWithdrawal,
  updateWithdrawal,
};
