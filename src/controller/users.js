const UserModel = require("../models/UserModel");

const getAllUsers = async (req, res) => {
  try {
    const [data] = await UserModel.getAllUsers();

    if (!data || data.length === 0) {
      return res.status(404).json({ message: `No users found` });
    }

    res.status(200).json({
      message: "Successfully retrieved all users data.",
      data: data,
    });
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const createNewUser = async (req, res) => {
  const { body } = req;

  if (!body.username || !body.email || !body.password) {
    return res.status(400).json({
      message: "Invalid input. fill in all the required data.",
    });
  }

  try {
    await UserModel.createNewUser(body);

    res.status(201).json({
      message: "User created successfully.",
      data: body,
    });
  } catch (error) {
    console.error("Error creating new user:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (!id || Object.keys(body).length === 0) {
    return res.status(400).json({
      message: "Invalid input. User ID and at least one field are required.",
    });
  }

  try {
    const [result] = await UserModel.updateUser(body, id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found.` });
    }

    res.status(200).json({
      message: "User updated successfully.",
      data: { id: id, ...body },
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await UserModel.deleteUser(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found.` });
    }

    res.status(200).json({
      message: "User deleted successfully.",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
