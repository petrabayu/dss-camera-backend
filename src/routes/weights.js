const express = require("express");
const router = express.Router();

const weightsController = require("../controller/weights");

//CREATE
router.post("/", weightsController.createNewWeight);

//READ
router.get("/", weightsController.getAllWeights);

//READ
router.get("/:id", weightsController.getWeightById);

//DELETE
router.delete("/:id", weightsController.deleteWeight);

module.exports = router;
