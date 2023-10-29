const LeagueModel = require("../models/LeagueModel");

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

module.exports = { leagueList, addLeague, deleteLeague };
