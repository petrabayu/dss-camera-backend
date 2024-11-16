const express = require("express");
const router = express.Router();

const weightsController = require("../controller/weights");

//CREATE
router.post("/", weightsController.createNewWeight);

//READ
router.get("/latest", weightsController.getLatestWeightId);

//READ
router.get("/:id", weightsController.getWeightById);

//READ
router.get("/", weightsController.getAllWeights);

//DELETE
router.delete("/:id", weightsController.deleteWeight);

module.exports = router;
