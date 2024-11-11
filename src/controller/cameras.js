const CameraModel = require("../models/CameraModel");

const getAllCameras = async (req, res) => {
  try {
    const [data] = await CameraModel.getAllCameras();

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No cameras found." });
    }

    res.status(200).json({
      message: "Successfully retrieved all cameras.",
      data: data,
    });
  } catch (error) {
    console.error("Error fetching all cameras:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const getCameraById = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await CameraModel.getCameraById(id);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: `Camera with ID ${id} not found.` });
    }

    res.status(200).json({
      message: `Successfully retrieved camera with ID ${id}.`,
      data: data,
    });
  } catch (error) {
    console.error("Error fetching camera by ID:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const getSelectedCameras = async (req, res) => {
  try {
    let { id } = req.body;

    if (!Array.isArray(id) || id.length === 0) {
      return res.status(400).json({ error: "Invalid input. Camera IDs must be a non-empty array." });
    }

    id = id.map((id) => parseInt(id, 10));
    const cameras = await CameraModel.getSelectedCameras(id);

    if (!cameras || cameras.length === 0) {
      return res.status(404).json({ message: "No cameras found for the given IDs." });
    }

    res.status(200).json({
      message: "Successfully retrieved selected cameras.",
      data: cameras,
    });
  } catch (error) {
    console.error("Error fetching selected cameras:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const createNewCamera = async (req, res) => {
  const { body } = req;

  try {
    await CameraModel.createNewCamera(body);
    res.status(201).json({
      message: "Create new Camera success",
      data: body,
    });
  } catch (error) {
    console.error("Error creating new camera:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const updateCamera = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await CameraModel.updateCamera(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found.` });
    }

    res.status(200).json({
      message: `Camera with id ${id} updated successfully.`,
    });
  } catch (error) {
    console.error("Error updating camera:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const deleteCamera = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await CameraModel.deleteCamera(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Camera with ID ${id} not found.` });
    }

    res.status(200).json({
      message: `Camera with id ${id} deleted successfully.`,
      data: null,
    });
  } catch (error) {
    console.error("Error deleting camera:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllCameras,
  getCameraById,
  getSelectedCameras,
  createNewCamera,
  updateCamera,
  deleteCamera,
};
