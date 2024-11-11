const express = require("express");
const router = express.Router();

const cameraMiddleware = require("../middleware/cameras");
const camerasController = require("../controller/cameras");

//CREATE
router.post("/", cameraMiddleware.cameraPostValidation, camerasController.createNewCamera);

//READ
router.get("/", camerasController.getAllCameras);
router.get("/:id", camerasController.getCameraById);
router.post("/selected", camerasController.getSelectedCameras);

//UPDATE
router.put("/:id", cameraMiddleware.prepareUpdateCameraData, camerasController.updateCamera);

//DELETE
router.delete("/:id", camerasController.deleteCamera);

module.exports = router;
