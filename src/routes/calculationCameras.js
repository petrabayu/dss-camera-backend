const express = require("express");
const router = express.Router();

const calculationCameraController = require("../controller/calculationCameras.js");

//CREATE
router.post("/", calculationCameraController.createNewRelation);

//READ
router.get("/", calculationCameraController.getAllRelations);

//READ
router.get("/:id", calculationCameraController.getRelationById);

//DELETE
router.delete("/:id", calculationCameraController.deleteRelation);

module.exports = router;
