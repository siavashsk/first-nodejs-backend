const TournamentModel = require("../models/TournamentModel");

const tournamentList = async (req, res, next) => {
  try {
    const tournaments = await TournamentModel.find({});
    res.send({
      success: true,
      message: "Tournament list generated successfuly",
      data: { tournaments },
    });
  } catch (error) {
    next(error);
  }
};

const getTournament = async (req, res, next) => {
  try {
    const {id} = req.params;
    if (!id) {
      return res
        .status(404)
        .send({ error: true, message: "There is no tournament with this id" });
    }
    const tournament = await TournamentModel.findOne({ _id: id });
    if (!tournament) {
      return res.status(404).send({ error: true, message: "Tournament not found" });
    }

    return res.send({
      success: true,
      data: { tournament },
    });

  } catch (error) {
    next(error)
  }
}

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
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        error: true,
        message: "There is no tournament with this id",
      });
    }

    await TournamentModel.deleteOne({ _id: id });
    res.send({
      success: true,
      message: "Tournament deleted successfuly",
    });
  } catch (error) {
    next(error);
  }
};

const updateTournament = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        error: true,
        message: "There is no tournament with this id",
      });
    }

    const { n, nModified } = await TournamentModel.updateOne(
      { _id: id },
      { ...req.body }
    );
    if (n === 0 || nModified === 0) {
      throw new Error("Update failed");
    }
    res.send({
      success: true,
      message: "Tournament updated successfuly",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { tournamentList,getTournament, addTournament, deleteTournament, updateTournament };
