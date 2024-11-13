require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const port = process.env.PORT || 4000;
app.use(express.json()); // mengizinkan request menerima format JSON

const usersRoutes = require("./routes/users");
const camaerasRoutes = require("./routes/cameras");
const weightRoutes = require("./routes/weights");
const scoreRoutes = require("./routes/scores");
const calculationRoutes = require("./routes/calculations");
const userCameraRoutes = require("./routes/userCameras");
const calculationCameraRoutes = require("./routes/calculationCameras");

const middlewareLogRequest = require("./middleware/logs");
const { TOPSISCalculation } = require("./controller/topsisCalculation");

app.use(middlewareLogRequest);

app.use("/api/users", usersRoutes);
app.use("/api/cameras", camaerasRoutes);
app.use("/api/ahp-weights", weightRoutes);
app.use("/api/topsis-scores", scoreRoutes);
app.use("/api/calculations", calculationRoutes);
app.use("/api/user-cameras", userCameraRoutes);
app.use("/api/calculation-cameras", calculationCameraRoutes);

//Proses Perhitungan AHP-TOPSIS
app.post("/api/topsis-calculation", TOPSISCalculation);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
