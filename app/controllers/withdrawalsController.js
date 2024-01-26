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

const getWithdrawal = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .send({ error: true, message: "There is no withdrawal with this id" });
    }
    const withdrawal = await WithdrawalModel.findOne({ _id: id });
    if (!withdrawal) {
      return res
        .status(404)
        .send({ error: true, message: "Withdrawal not found" });
    }

    return res.send({
      success: true,
      data: { withdrawal },
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
