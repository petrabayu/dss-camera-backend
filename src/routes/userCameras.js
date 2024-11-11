const express = require("express");
const router = express.Router();

const userCameraController = require("../controller/userCameras.js");

//CREATE
router.post("/", userCameraController.createNewRelation);

//READ
router.get("/", userCameraController.getAllRelations);

//READ
router.get("/:id", userCameraController.getRelationById);

//DELETE
router.delete("/:id", userCameraController.deleteRelation);

module.exports = router;
