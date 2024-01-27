const TournamentModel = require("../models/TournamentModel");
const { getItemsList, getItem, deleteItem, updateItem } = require("./dynamicController");

const tournamentList = async (req, res, next) => {
  getItemsList(req, res, next, "tournament", TournamentModel);
};

const getTournament = async (req, res, next) => {
  getItem(req, res, next, "tournament", TournamentModel);
};

const addTournament = async (req, res, next) => {
  try {
    const { game, cost, capacity, league_status, cost_of_type } = req.body;
    const newTournament = new TournamentModel({
      game,
      cost,
      capacity,
      league_status,
      cost_of_type,
    });
    await newTournament.save();
    res.status(201).send({
      success: true,
      message: "New tournament created successfuly",
      newTournament,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTournament = async (req, res, next) => {
  deleteItem(req, res, next, "tournament", TournamentModel);
};

const updateTournament = async (req, res, next) => {
  updateItem(req, res, next, "tournament", TournamentModel);
};

module.exports = {
  tournamentList,
  getTournament,
  addTournament,
  deleteTournament,
  updateTournament,
};
