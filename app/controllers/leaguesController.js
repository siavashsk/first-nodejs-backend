const LeagueModel = require("../models/LeagueModel");
const { getItemsList, getItem, deleteItem } = require("./dynamicController");

const leagueList = async (req, res, next) => {
  getItemsList(req, res, next, "league", LeagueModel);
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
  getItem(req, res, next, "league", LeagueModel);
};

const deleteLeague = async (req, res, next) => {
  deleteItem(req, res, next, "league", LeagueModel);
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

module.exports = {
  leagueList,
  getLeague,
  addLeague,
  deleteLeague,
  updateLeague,
};
