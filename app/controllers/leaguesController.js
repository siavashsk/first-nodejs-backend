const LeagueModel = require("../models/LeagueModel");
const {
  getItemsList,
  getItem,
  deleteItem,
  updateItem,
} = require("./dynamicController");

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
  updateItem(req, res, next, "league", LeagueModel);
};

module.exports = {
  leagueList,
  getLeague,
  addLeague,
  deleteLeague,
  updateLeague,
};
