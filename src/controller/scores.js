const ScoreModel = require("../models/ScoreModel");

const getAllScores = async (req, res) => {
  try {
    const [data] = await ScoreModel.getAllScores();

    if (!data || data.length === 0) {
      return res.status(404).json({ message: `No scores found` });
    }

    res.status(200).json({
      message: "Successfully retrieved all scores data.",
      data: data,
    });
  } catch (error) {
    console.error("Error fetching all score:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const getScoreById = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await ScoreModel.getScore(id);

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: `Score with ID ${id} not found.`,
      });
    }

    res.status(200).json({
      message: `Successfully retrieved score data for ID ${id}.`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const createNewScore = async (req, res) => {
  const { body } = req;

  try {
    await ScoreModel.createNewScore(body);
    res.status(201).json({
      message: "Create new score success",
      data: body,
    });
  } catch (error) {
    console.error("Error creating new score:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const deleteScore = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await ScoreModel.deleteScore(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Score with ID ${id} not found.` });
    }
    res.status(200).json({
      message: "Score deleted successfully.",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting score:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllScores,
  getScoreById,
  createNewScore,
  deleteScore,
};
