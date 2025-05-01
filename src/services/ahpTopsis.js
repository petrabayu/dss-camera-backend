const AHPServices = {
  nilaiIRSaaty: {
    1: 0.0,
    2: 0.0,
    3: 0.58,
    4: 0.9,
    5: 1.12,
    6: 1.24,
    7: 1.32,
    8: 1.41,
    9: 1.45,
    10: 1.49,
    11: 1.51,
    12: 1.48,
    13: 1.56,
    14: 1.57,
    15: 1.59,
  },

  normalizeMatrix: (matrix) => {
    // Langkah 1: Hitung jumlah dari tiap kolom
    const sumColumns = [];

    for (let col = 0; col < matrix[0].length; col++) {
      let sum = 0;
      for (let row = 0; row < matrix.length; row++) {
        sum += matrix[row][col]; // Menambahkan elemen dari tiap baris di kolom tersebut
      }
      sumColumns.push(sum); // Tambahkan hasil penjumlahan ke array sumColumns
    }

    console.log("Hasil Penjumlahan Tiap Kolom Matriks Berpasangan:", sumColumns);

    // Langkah 2: Bagi tiap elemen matriks dengan jumlah kolom yang sesuai
    const normalizedMatrix = [];
    for (let row = 0; row < matrix.length; row++) {
      const normalizedRow = [];
      for (let col = 0; col < matrix[row].length; col++) {
        const normalizedValue = matrix[row][col] / sumColumns[col];
        normalizedRow.push(normalizedValue);
      }
      normalizedMatrix.push(normalizedRow);
    }
    return normalizedMatrix;
  },

  avgPerRowCalculation: (matrix) => {
    const avgPerRow = matrix.map((row) => {
      const sum = row.reduce((sum, value) => sum + value, 0);
      return sum / row.length;
    });

    return avgPerRow;
  },

  consistencyCalculation: (matrix, weights) => {
    const consistencyTable = [];
    for (let row = 0; row < matrix.length; row++) {
      const rowResult = [];
      for (let col = 0; col < matrix[row].length; col++) {
        // Mengalikan elemen matriks dengan rata-rata baris yang sesuai
        const multiplication = matrix[row][col] * weights[col];
        rowResult.push(multiplication);
      }
      consistencyTable.push(rowResult);
    }
    return consistencyTable;
  },

  sumMatrixConsistencyCalculation: (matrix) => {
    return matrix.map((row) => {
      const sum = row.reduce((sum, value) => sum + value, 0);
      return sum;
    });
  },

  lambdaMaxCalculation: (sum, weights) => {
    const lambdaVector = [];
    for (let i = 0; i < sum.length; i++) {
      let result = sum[i] / weights[i];
      lambdaVector.push(result);
    }
    console.log("Hasil =sum/bobot kriteri:", lambdaVector);

    const totalSum = lambdaVector.reduce((sum, nilai) => sum + nilai, 0);
    const lambdaMax = totalSum / lambdaVector.length;

    return lambdaMax;
  },

  CIandCRCalculation: (lambdaMax, matrix) => {
    const CI = (lambdaMax - matrix.length) / (matrix.length - 1);
    console.log("CI:", CI);
    const CR = CI / AHPServices.nilaiIRSaaty[matrix.length];
    console.log("CR:", CR);

    return CR < 0.1 ? "CONSISTENT" : "NOT CONSISTENT";
  },
};

const TOPSISServices = {
  squareRootVectorCalculation: (matrix) => {
    const squareRootVector = [];

    for (let col = 0; col < matrix[0].length; col++) {
      let sum = 0;
      for (let row = 0; row < matrix.length; row++) {
        sum += matrix[row][col] * matrix[row][col];
      }
      let squareRoot = Math.sqrt(sum);
      squareRootVector.push(squareRoot);
    }

    return squareRootVector;
  },

  normalizeMatrix: (matrix, squareRootVector) => {
    const normalizationMatrix = [];

    for (let row = 0; row < matrix.length; row++) {
      const normalizedRow = [];
      for (let col = 0; col < matrix[row].length; col++) {
        const normalizedValue = matrix[row][col] / squareRootVector[col];
        normalizedRow.push(normalizedValue);
      }
      normalizationMatrix.push(normalizedRow);
    }

    return normalizationMatrix;
  },

  normalizationWithWeightCalculation: (normalizedMatrix, weights) => {
    const normalizationWithWeightMatrix = [];

    for (let row = 0; row < normalizedMatrix.length; row++) {
      const normalizedRow = [];
      for (let col = 0; col < normalizedMatrix[row].length; col++) {
        const normalizedValue = normalizedMatrix[row][col] * weights[col];
        normalizedRow.push(normalizedValue);
      }
      normalizationWithWeightMatrix.push(normalizedRow);
    }

    return normalizationWithWeightMatrix;
  },

  transposeArrayCalculation: (matrix) => {
    // Tentukan ukuran baris (jumlah array yang akan dihasilkan)
    const numColumns = matrix[0].length;
    const numRows = matrix.length;

    // Buat array baru untuk menyimpan hasil
    const transposedArray = [];

    // Loop untuk mengisi array baru dengan cara transpose
    for (let i = 0; i < numColumns; i++) {
      const newRow = [];
      for (let j = 0; j < numRows; j++) {
        newRow.push(matrix[j][i]);
      }
      transposedArray.push(newRow);
    }
    return transposedArray;
  },

  positifIdealSolutionCalculation: (normalizedMatrix) => {
    const positifIdealSolution = [];

    for (let i = 0; i < normalizedMatrix.length; i++) {
      if (i == 0 || i == 4 || i == 7 || i == 14) {
        positifIdealSolution.push(Math.min(...normalizedMatrix[i]));
      } else {
        positifIdealSolution.push(Math.max(...normalizedMatrix[i]));
      }
    }
    return positifIdealSolution;
  },

  negativeIdealSolutionCalculation: (normalizedMatrix) => {
    const negatifIdealSolution = [];

    for (let i = 0; i < normalizedMatrix.length; i++) {
      if (i == 0 || i == 4 || i == 7 || i == 14) {
        negatifIdealSolution.push(Math.max(...normalizedMatrix[i]));
      } else {
        negatifIdealSolution.push(Math.min(...normalizedMatrix[i]));
      }
    }
    return negatifIdealSolution;
  },

  positiveClosenessCalculation: (normalizationWithWeight, PISVector) => {
    const positiveClosenessMatrix = [];

    // Loop untuk setiap baris di matrix1
    normalizationWithWeight.forEach((row) => {
      const rowResult = [];

      // Loop untuk setiap elemen dalam baris
      row.forEach((value, index) => {
        const diff = Math.abs(value - PISVector[index]); // Hitung selisih absolut
        rowResult.push(Math.pow(diff, 2)); // Kuadratkan selisih
      });

      positiveClosenessMatrix.push(rowResult); // Tambahkan hasil ke array hasil
    });

    return positiveClosenessMatrix;
  },

  negativeClosenessCalculation: (normalizationWithWeight, NISVector) => {
    const negativeClosenessMatrix = [];

    // Loop untuk setiap baris di normalisasiWithWeight
    normalizationWithWeight.forEach((row) => {
      const rowResult = [];

      // Loop untuk setiap elemen dalam baris
      row.forEach((value, index) => {
        const diff = Math.abs(value - NISVector[index]); // Hitung selisih absolut
        rowResult.push(Math.pow(diff, 2)); // Kuadratkan selisih
      });

      negativeClosenessMatrix.push(rowResult); // Tambahkan hasil ke array hasil
    });

    return negativeClosenessMatrix;
  },

  relativeClosenessSumRowsCalculation: (matrix) => {
    const rowSums = [];
    const sqrtRowSums = [];

    matrix.forEach((row) => {
      const rowSum = row.reduce((sum, value) => sum + value, 0); // Jumlahkan elemen-elemen di baris
      const sqrtSum = Math.sqrt(rowSum); // Hitung akar kuadrat dari hasil penjumlahan
      rowSums.push(rowSum); // Simpan hasil penjumlahan per baris
      sqrtRowSums.push(sqrtSum);
    });

    return sqrtRowSums; // Kembalikan array hasil penjumlahan baris
  },

  closenessCoeficientCalculation: (positiveIdealSolution, negativeIdealSolution) => {
    const alternativeRanking = [];
    for (let i = 0; i < negativeIdealSolution.length; i++) {
      const closenessCoeficient =
        negativeIdealSolution[i] / (positiveIdealSolution[i] + negativeIdealSolution[i]);
      alternativeRanking.push(closenessCoeficient);
    }
    return alternativeRanking;
  },
};

module.exports = { AHPServices, TOPSISServices };
