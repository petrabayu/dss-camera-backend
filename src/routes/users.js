const express = require("express");
const router = express.Router();

const usersController = require("../controller/users");

//CREATE
router.post("/", usersController.createNewUser);

//READ
router.get("/", usersController.getAllUsers);

//UPDATE
router.put("/:id", usersController.updateUser);

//DELETE
router.delete("/:id", usersController.deleteUser);

module.exports = router;
