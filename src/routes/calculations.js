const express = require("express");
const router = express.Router();

const calculationController = require("../controller/calculations.js");

//CREATE
router.post("/", calculationController.createNewCalculation);

//READ
router.get("/", calculationController.getAllCalculations);

//READ
router.get("/:id", calculationController.getCalculationById);

//DELETE
router.delete("/:id", calculationController.deleteCalculation);

module.exports = router;
