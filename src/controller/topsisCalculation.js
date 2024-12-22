const { TOPSISServices } = require("../services/ahpTopsis");
const CameraModel = require("../models/CameraModel");
const WeightModel = require("../models/WeightModel");
const ScoreModel = require("../models/ScoreModel");

const TOPSISCalculation = async (req, res) => {
  try {
    const { alternativeId, ahpWeightId } = req.body;
    // console.log("Body Received for TOPSIS Calculation:", req.body);

    // Validasi input dari body
    if (!alternativeId || !Array.isArray(alternativeId) || alternativeId.length === 0) {
      return res.status(400).json({ message: "Invalid input. 'alternativeId' must be a non-empty array." });
    }

    if (!ahpWeightId) {
      return res.status(400).json({ message: "Invalid input. 'ahpWeightId' is required." });
    }

    const alternativeMatrix = await CameraModel.getSelectedCameras(alternativeId);
    // console.log("Alternatif Kamera", alternativeMatrix);

    if (!alternativeMatrix || alternativeMatrix.length === 0) {
      return res.status(404).json({ message: "No alternative data found for the provided IDs." });
    }

    const transformedMatrix = alternativeMatrix.map((camera) => [
      camera.price,
      camera.pixel,
      camera.max_resolution,
      camera.sensor_size,
      camera.min_iso,
      camera.max_iso,
      camera.min_shutter_speed,
      camera.max_shutter_speed,
      camera.continues_drive,
      camera.max_video_resolution,
      camera.max_video_fps,
      camera.battery_life,
      camera.articulated_lcd,
      camera.screen_dots,
      camera.weight,
    ]);

    console.log("Matriks Alternatif Camera:", transformedMatrix);
    console.log("----------------------------------------------------");
    console.log("");

    const [AHPweightsDatabase] = await WeightModel.getWeight(ahpWeightId);
    // console.log("Nilai bobot dari database (AHPweightsDatabase):", AHPweightsDatabase);
    if (!AHPweightsDatabase) {
      return res.status(404).json({ message: `AHP weights with ID ${ahpWeightId} not found.` });
    }

    const AHPweights = [
      AHPweightsDatabase.price_weight,
      AHPweightsDatabase.pixel_weight,
      AHPweightsDatabase.max_resolution_weight,
      AHPweightsDatabase.sensor_size_weight,
      AHPweightsDatabase.min_iso_weight,
      AHPweightsDatabase.max_iso_weight,
      AHPweightsDatabase.min_shutter_speed_weight,
      AHPweightsDatabase.max_shutter_speed_weight,
      AHPweightsDatabase.continues_drive_weight,
      AHPweightsDatabase.max_video_resolution_weight,
      AHPweightsDatabase.max_video_fps_weight,
      AHPweightsDatabase.battery_life_weight,
      AHPweightsDatabase.articulated_lcd_weight,
      AHPweightsDatabase.screen_dots_weight,
      AHPweightsDatabase.weight_weight,
    ];

    console.log("Nilai Bobot Final:", AHPweights);
    console.log("----------------------------------------------------");
    console.log("");

    if (!AHPweights || AHPweights.includes(undefined)) {
      return res.status(400).json({ message: "AHP weights data is incomplete or invalid." });
    }

    if (transformedMatrix.length === 0 || !AHPweights || AHPweights.length === 0) {
      return res.status(400).json({ message: "Alternative data or AHP weights were not found or are empty." });
    }

    try {
      const squareRootResults = TOPSISServices.squareRootVectorCalculation(transformedMatrix);
      console.log("Hasil Penjumlahan Tiap Kolom Matriks Berpasangan:", squareRootResults);
      console.log("----------------------------------------------------");
      console.log("");

      const normalizationMatrix = TOPSISServices.normalizeMatrix(transformedMatrix, squareRootResults);
      console.log("Tabel Normalisasi Alternatif:", normalizationMatrix);
      console.log("----------------------------------------------------");
      console.log("");

      const normalizationWithWeightMatrix = TOPSISServices.normalizationWithWeightCalculation(
        normalizationMatrix,
        AHPweights
      );
      console.log("Tabel Normalisasi Alternatif * Bobot:", normalizationWithWeightMatrix);
      console.log("----------------------------------------------------");
      console.log("");

      const transposeArray = TOPSISServices.transposeArrayCalculation(normalizationWithWeightMatrix);
      // console.log("Transpose Array Normalisasi * Bobot:", transposeArray);

      const positifIdealSolution = TOPSISServices.positifIdealSolutionCalculation(transposeArray);
      console.log("Vektor Solusi Ideal Positif:", positifIdealSolution);
      console.log("----------------------------------------------------");
      console.log("");

      const negativeIdelaSolution = TOPSISServices.negativeIdealSolutionCalculation(transposeArray);
      console.log("Vektor Solusi Ideal Negatif:", negativeIdelaSolution);
      console.log("----------------------------------------------------");
      console.log("");

      const positiveCloseness = TOPSISServices.positiveClosenessCalculation(
        normalizationWithWeightMatrix,
        positifIdealSolution
      );
      console.log("Matriks Perhitungan Jarak Kedekatan SIP:", positiveCloseness);
      console.log("----------------------------------------------------");
      console.log("");

      const negativeCloseness = TOPSISServices.negativeClosenessCalculation(
        normalizationWithWeightMatrix,
        negativeIdelaSolution
      );
      console.log("Matriks Perhitungan Jarak Kedekatan SIN:", negativeCloseness);
      console.log("----------------------------------------------------");
      console.log("");

      const positveClosenessSumRow = TOPSISServices.relativeClosenessSumRowsCalculation(positiveCloseness);
      console.log("Jarak Kedekatan Solusi Ideal Positif", positveClosenessSumRow);
      console.log("----------------------------------------------------");
      console.log("");

      const negativeClosenessSumRows = TOPSISServices.relativeClosenessSumRowsCalculation(negativeCloseness);
      console.log("Jarak Kedekatan Solusi Ideal Negatif", negativeClosenessSumRows);
      console.log("----------------------------------------------------");
      console.log("");

      const idealSolution = TOPSISServices.closenessCoeficientCalculation(
        positveClosenessSumRow,
        negativeClosenessSumRows
      );
      console.log("Nilai solusi ideal:", idealSolution);
      console.log("----------------------------------------------------");
      console.log("");

      for (let i = 0; i < alternativeId.length; i++) {
        const cameraId = alternativeId[i];
        const pisScore = positveClosenessSumRow[i];
        const nisScore = negativeClosenessSumRows[i];

        await ScoreModel.createNewScore({
          camera_id: cameraId,
          pis_score: pisScore,
          nis_score: nisScore,
        });
      }

      res.status(201).json({
        message: "TOPSIS calculation successful",
        cameraId: alternativeId,
        pis: positveClosenessSumRow,
        nis: negativeClosenessSumRows,
        idealSolution: idealSolution,
      });
    } catch (calcError) {
      console.error("Error during TOPSIS calculation:", calcError.message);
      res.status(500).json({
        message: "An error occurred during TOPSIS calculation.",
        serverMessage: calcError.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error calculating TOPSIS method",
      serverMessage: error,
    });
  }
};

module.exports = {
  TOPSISCalculation,
};
