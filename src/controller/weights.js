const WeightModel = require("../models/WeightModel");

const getAllWeights = async (req, res) => {
  try {
    const [data] = await WeightModel.getAllWeights();

    if (!data || data.length === 0) {
      return res.status(404).json({ message: `No weights found` });
    }

    res.status(200).json({
      message: "Successfully retrieved all weights data.",
      data: data,
    });
  } catch (error) {
    console.error("Error fetching all weight:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const getWeightById = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await WeightModel.getWeight(id);

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: `Weight with ID ${id} not found.`,
      });
    }

    res.status(200).json({
      message: `Successfully retrieved weight data for ID ${id}.`,
      data: data,
    });
  } catch (error) {
    console.error("Error fetching weight by ID:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const createNewWeight = async (req, res) => {
  const { body } = req;

  try {
    await WeightModel.createNewWeight(body);
    res.status(201).json({
      message: "Create new weight success",
      data: body,
    });
  } catch (error) {
    console.error("Error creating new weight:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const deleteWeight = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await WeightModel.deleteWeight(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Weight with ID ${id} not found.` });
    }

    res.status(200).json({
      message: "Weight deleted successfully.",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting weight:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllWeights,
  getWeightById,
  createNewWeight,
  deleteWeight,
};
