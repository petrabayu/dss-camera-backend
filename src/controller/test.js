const TOPSISCalculation = async (req, res) => {
    try {
      const { alternativeId, ahpWeightId } = req.body;
  
      // Validasi input dari body
      if (!alternativeId || !Array.isArray(alternativeId) || alternativeId.length === 0) {
        return res.status(400).json({ message: "Invalid input. 'alternativeId' must be a non-empty array." });
      }
  
      if (!ahpWeightId) {
        return res.status(400).json({ message: "Invalid input. 'ahpWeightId' is required." });
      }
  
      // Ambil data alternatif dari database
      const alternativeMatrix = await CameraModel.getSelectedCameras(alternativeId);
      if (!alternativeMatrix || alternativeMatrix.length === 0) {
        return res.status(404).json({ message: "No alternative data found for the provided IDs." });
      }
  
      console.log("Matriks Alternatif Setelah Transformasi:", alternativeMatrix);
  
      // Ambil data bobot dari database
      const [AHPweightsDatabase] = await WeightModel.getWeight(ahpWeightId);
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
  
      console.log("Nilai Bobot AHP Setelah Transformasi:", AHPweights);
  
      if (!AHPweights || AHPweights.includes(undefined)) {
        return res.status(400).json({ message: "AHP weights data is incomplete or invalid." });
      }
  
      // Mulai perhitungan TOPSIS
      try {
        const squareRootResults = TOPSISServices.squareRootVectorCalculation(alternativeMatrix);
        console.log("Hasil Penjumlahan Tiap Kolom Matriks Berpasangan:", squareRootResults);
  
        const normalizationMatrix = TOPSISServices.normalizeMatrix(alternativeMatrix, squareRootResults);
        console.log("Tabel Normalisasi Alternatif:", normalizationMatrix);
  
        const normalizationWithWeightMatrix = TOPSISServices.normalizationWithWeightCalculation(
          normalizationMatrix,
          AHPweights
        );
        console.log("Tabel Normalisasi Alternatif * Bobot:", normalizationWithWeightMatrix);
  
        const transposeArray = TOPSISServices.transposeArrayCalculation(normalizationWithWeightMatrix);
        console.log("Transpose Array Normalisasi * Bobot:", transposeArray);
  
        const positifIdealSolution = TOPSISServices.positifIdealSolutionCalculation(transposeArray);
        console.log("Vektor Solusi Ideal Positif:", positifIdealSolution);
  
        const negativeIdelaSolution = TOPSISServices.negativeIdealSolutionCalculation(transposeArray);
        console.log("Vektor Solusi Ideal Negatif:", negativeIdelaSolution);
  
        const positiveCloseness = TOPSISServices.positiveClosenessCalculation(
          normalizationWithWeightMatrix,
          positifIdealSolution
        );
        console.log("Matriks Perhitungan Jarak Kedekatan SIP:", positiveCloseness);
  
        const negativeCloseness = TOPSISServices.negativeClosenessCalculation(
          normalizationWithWeightMatrix,
          negativeIdelaSolution
        );
        console.log("Matriks Perhitungan Jarak Kedekatan SIN:", negativeCloseness);
  
        const positveClosenessSumRow = TOPSISServices.relativeClosenessSumRowsCalculation(positiveCloseness);
        console.log("Jarak Kedekatan Solusi Ideal Positif", positveClosenessSumRow);
  
        const negativeClosenessSumRows = TOPSISServices.relativeClosenessSumRowsCalculation(negativeCloseness);
        console.log("Jarak Kedekatan Solusi Ideal Negatif", negativeClosenessSumRows);
  
        const idealSolution = TOPSISServices.idealSolutionCalculation(positveClosenessSumRow, negativeClosenessSumRows);
        console.log("Nilai solusi ideal:", idealSolution);
  
        res.status(201).json({
          message: "TOPSIS calculation successful",
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
      console.error("Unexpected error in TOPSISCalculation:", error.message);
      res.status(500).json({
        message: "Internal server error occurred while calculating TOPSIS.",
        serverMessage: error.message,
      });
    }
  };
  