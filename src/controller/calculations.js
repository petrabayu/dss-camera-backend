const CalculationModel = require("../models/CalculationModel.js");

const getAllCalculations = async (req, res) => {
  try {
    const [data] = await CalculationModel.getAllCalculations();

    if (!data || data.length === 0) {
      return res.status(404).json({ message: `No calculations found` });
    }

    res.status(200).json({
      message: "Successfully retrieved all calculations data.",
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

const getCalculationById = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await CalculationModel.getCalculation(id);

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: `Calculation with ID ${id} not found.`,
      });
    }

    res.status(200).json({
      message: `Successfully retrieved calculation data for ID ${id}.`,
      data: data,
    });
  } catch (error) {
    console.error("Error fetching calculation by ID:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const createNewCalculation = async (req, res) => {
  const { body } = req;

  try {
    await CalculationModel.createNewCalculation(body);
    res.status(201).json({
      message: "Create new calculation success",
      data: body,
    });
  } catch (error) {
    console.error("Error creating new calculation:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const deleteCalculation = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await CalculationModel.deleteCalculation(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Calculation with ID ${id} not found.` });
    }

    res.status(200).json({
      message: "Calculation deleted successfully.",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting calculation:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllCalculations,
  getCalculationById,
  createNewCalculation,
  deleteCalculation,
};
