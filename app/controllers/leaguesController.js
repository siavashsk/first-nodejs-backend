const LeagueModel = require("../models/LeagueModel");
const productModel = require("../models/ProductModel");

const leagueList = async (req, res, next) => {
  try {
    const leagues = await LeagueModel.find({});
    res.send({
      success: true,
      message: "Leagues list generated successfuly",
      data: { leagues },
    });
  } catch (error) {
    next();
  }
};

const addLeague = async (req, res, next) => {
  try {
    const {
      username,
      game,
      cost,
      capacity,
      league_status,
      cost_of_type,
      round,
    } = req.body;
    const newLeague = new LeagueModel({
      username,
      game,
      cost,
      capacity,
      league_status,
      cost_of_type,
      round,
    });
    await newLeague.save();
    res.status(201).send({
      success: true,
      message: "New leagues created successfuly",
      newLeague,
    });
  } catch (error) {
    next(error);
  }
};

const getLeague = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .send({ error: true, message: "There is no league with this id" });
    }

    const product = await productModel.findOne({ _id: id });
    if (!product) {
      return res.status(404).send({ error: true, message: "League not found" });
    }
    return res.send({ success: true, data: product });

  } catch (error) {
    next(error);
  }
};

const deleteLeague = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        error: true,
        message: "There is no league with this id",
      });
    }

    await LeagueModel.deleteOne({ _id: id });
    res.send({
      success: true,
      message: "League deleted successfuly",
    });
  } catch (error) {
    next(error);
  }
};

const updateLeague = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        error: true,
        message: "There is no league with this id",
      });
    }

    const { n, nModified } = await LeagueModel.updateOne(
      { _id: id },
      { ...req.body }
    );
    if (n === 0 || nModified === 0) {
      throw new Error("Update failed");
    }

    res.send({
      success: true,
      message: "League updated successfuly",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { leagueList,getLeague, addLeague, deleteLeague, updateLeague };
