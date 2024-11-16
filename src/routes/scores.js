const express = require("express");
const router = express.Router();

const scoreController = require("../controller/scores");

//CREATE
router.post("/", scoreController.createNewScore);

//READ
router.get("/", scoreController.getAllScores);

//READ
router.get("/ranking", scoreController.getRankingWithCameraNames);

//READ
router.get("/:id", scoreController.getScoreById);

//DELETE
router.delete("/:id", scoreController.deleteScore);

module.exports = router;
