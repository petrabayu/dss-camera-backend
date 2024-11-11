const UserCameraModel = require("../models/UserCameraModel.js");

const getAllRelations = async (req, res) => {
  try {
    const [data] = await UserCameraModel.getAllRelations();

    if (!data || data.length === 0) {
      return res.status(404).json({ message: `No relation between users and cameras found` });
    }

    res.status(200).json({
      message: "Successfully retrieved all calculation data between users and cameras.",
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
    const [data] = await UserCameraModel.getRelation(id);

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: `Calculation with ID ${id} not found.`,
      });
    }

    res.status(200).json({
      message: `Successfully retrieved relation data between user and camera for ID ${id}.`,
      data: data,
    });
  } catch (error) {
    console.error("Error fetching all relation between user and camera:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const createNewRelation = async (req, res) => {
  const { body } = req;

  try {
    await UserCameraModel.createNewRelation(body);
    res.status(201).json({
      message: "Create new relation between user and camera success",
      data: body,
    });
  } catch (error) {
    console.error("Error creating new relation between user and camera:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const deleteRelation = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await UserCameraModel.deleteRelation(id);

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
