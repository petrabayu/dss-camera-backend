const CalculationCameraModel = require("../models/CalculationCameraModel.js");

const getAllRelations = async (req, res) => {
  try {
    const [data] = await CalculationCameraModel.getAllRelations();

    if (!data || data.length === 0) {
      return res.status(404).json({ message: `No relation between calculations and cameras found` });
    }

    res.status(200).json({
      message: "Successfully retrieved all relation data between calculations and cameras data.",
      data: data,
    });
  } catch (error) {
    console.error("Error fetching all calculation:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const getRelationById = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await CalculationCameraModel.getRelation(id);

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: `Calculation with ID ${id} not found.`,
      });
    }

    res.status(200).json({
      message: `Successfully retrieved relation data between calculation and camera for ID ${id}.`,
      data: data,
    });
  } catch (error) {
    console.error("Error fetching all relation between calculation and camera:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const createNewRelation = async (req, res) => {
  const { body } = req;

  try {
    await CalculationCameraModel.createNewRelation(body);
    res.status(201).json({
      message: "Create new relation between calculation and camera",
      data: body,
    });
  } catch (error) {
    console.error("Error creating new relation between calculation and camera:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const deleteRelation = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await CalculationCameraModel.deleteRelation(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Calculation with ID ${id} between user and camera not found.` });
    }

    res.status(200).json({
      message: "Relation deleted successfully.",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting relation:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllRelations,
  getRelationById,
  createNewRelation,
  deleteRelation,
};
