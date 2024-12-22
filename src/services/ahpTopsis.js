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
      const closenessCoeficient = negativeIdealSolution[i] / (positiveIdealSolution[i] + negativeIdealSolution[i]);
      alternativeRanking.push(closenessCoeficient);
    }
    return alternativeRanking;
  },
};

module.exports = { AHPServices, TOPSISServices };

//   const nilaiIRSaaty = {
//     1: 0.0,
//     2: 0.0,
//     3: 0.58,
//     4: 0.9,
//     5: 1.12,
//     6: 1.24,
//     7: 1.32,
//     8: 1.41,
//     9: 1.45,
//     10: 1.49,
//     11: 1.51,
//     12: 1.48,
//     13: 1.56,
//     14: 1.57,
//     15: 1.59,
//   };

//   const matriksNormalisasi = [
//     [1, 3, 1 / 5],
//     [1 / 3, 1, 1 / 7],
//     [5, 7, 1],
//   ];

//   const hasilNormalisasi = normalisasiMatriks(matriksNormalisasi);
//   console.log("Matriks Normalisasi:", hasilNormalisasi);

//   const bobotRelatif = averagePerBaris(hasilNormalisasi);
//   console.log("Bobot/Prioritas Relatif:", bobotRelatif);

//   const konsistensi = checkConsistency(matriksNormalisasi, bobotRelatif); //ini matriks pada tahap check consistency
//   console.log("Tabel Konsistensi", konsistensi);

//   const sumBarisKonsistensi = sumMatrixConsistency(konsistensi);
//   console.log("Hasil Penjumlahan Tiap Baris Tabel Konsistensi:", sumBarisKonsistensi);

//   const nilaiLambdaMax = lambdaMaxCalculation(sumBarisKonsistensi, bobotRelatif);
//   console.log("nilai Lambda Max:", nilaiLambdaMax);

//   const validasiMatriksPerbandingan = cicrCalculation(nilaiLambdaMax, matriksNormalisasi, nilaiIRSaaty);
//   console.log(validasiMatriksPerbandingan);

//TOPSIS

// const matriksAlternatif = [
//   [23968000, 26, 25560576, 3, 100, 32000, 30, 1 / 4000, 11, 8294400, 120, 570, 3, 1036800, 493],
//   [9600000, 24, 24000000, 3, 100, 12800, 1, 1 / 4000, 6.5, 8294400, 120, 340, 1, 1040000, 356],
//   [12800000, 24, 24000000, 3, 100, 32000, 30, 1 / 4000, 12, 8294400, 120, 420, 3, 1620000, 375],
//   [11984000, 20, 20155392, 2, 200, 25600, 60, 1 / 500, 10, 7372800, 120, 270, 3, 1840000, 352],
//   [15984000, 21, 20668416, 3, 100, 51200, 30, 1 / 4000, 11, 8294400, 120, 320, 2, 1040000, 450],
// ];

// const nilaiBobot = [
//   0.0451, 0.0442, 0.0191, 0.1656, 0.2129, 0.1359, 0.0726, 0.0412, 0.0218, 0.0709, 0.0236, 0.0805, 0.0413, 0.0169,
//   0.0083,
// ];

//   const squareRootResults = squareRootCalculation(matriksAlternatif);
//   // console.log("Hasil Penjumlahan Tiap Kolom Matriks Berpasangan:", squareRootResults);

//   const normalizationMatrix = normalizationCalculation(matriksAlternatif, squareRootResults);
//   // console.log("Tabel Normalisasi Alternatif:", normalizationMatrix);

//   const normalizationWithWeightMatrix = normalizationWithWeightCalculation(normalizationMatrix, nilaiBobot);
//   // console.log("Tabel Normalisasi Alternatif * Bobot:", normalizationWithWeightMatrix);

//   const transposeArray = transposeArrayCalculation(normalizationWithWeightMatrix);
//   // console.log("Transpose Array Normalisasi * Bobot:", transposeArray);

//   const solusiIdealPositif = positifIdealSolutionCalculation(transposeArray);
//   // console.log("Vektor Solusi Ideal Positif:", solusiIdealPositif);

//   const solusiIdealNegatif = negativeIdealSolutionCalculation(transposeArray);
//   // console.log("Vektor Solusi Ideal Negatif:", solusiIdealNegatif);

//   const jarakKedekatanPositif = jarakKedekatanPositifCalculation(normalizationWithWeightMatrix, solusiIdealPositif);
//   // console.log("Matriks Perhitungan Jarak Kedekatan SIP:", jarakKedekatanPositif);

//   const jarakKedekatanNegatif = jarakKedekatanNegatifCalculation(normalizationWithWeightMatrix, solusiIdealNegatif);
//   // console.log("Matriks Perhitungan Jarak Kedekatan SIN:", jarakKedekatanNegatif);

//   const jumlahBarisJarakPositif = relativeClosenessSumRowsCalculation(jarakKedekatanPositif);
//   console.log("Jarak Kedekatan Solusi Ideal Positif", jumlahBarisJarakPositif);

//   const jumlahBarisJarakNegatif = relativeClosenessSumRowsCalculation(jarakKedekatanNegatif);
//   console.log("Jarak Kedekatan Solusi Ideal Negatif", jumlahBarisJarakNegatif);

//   const solusiIdeal = idealSolutionCalculation(jumlahBarisJarakPositif, jumlahBarisJarakNegatif);
//   console.log("Nilai solusi ideal:", solusiIdeal);
