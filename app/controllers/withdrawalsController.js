const WithdrawalModel = require("../models/withdrawalModel");

const withdrawalList = async (req, res, next) => {
  try {
    const withdrawals = await WithdrawalModel.find({});
    res.send({
      success: true,
      message: "Withdrawal list generated successfuly",
      data: { withdrawals },
    });
  } catch (error) {
    next(error);
  }
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
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        error: true,
        message: "There is no withdrawal with this id",
      });
    }

    await WithdrawalModel.deleteOne({ _id: id });
    res.send({
      success: true,
      message: "Withdrawal deleted successfuly",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { withdrawalList, addWithdrawal, deleteWithdrawal };
