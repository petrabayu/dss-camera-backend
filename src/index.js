require("dotenv").config();

const express = require("express");

const app = express();
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



app.use("/users", usersRoutes);
app.use("/cameras", camaerasRoutes);
app.use("/ahp-weights", weightRoutes);
app.use("/topsis-scores", scoreRoutes);
app.use("/calculations", calculationRoutes);
app.use("/user-cameras", userCameraRoutes);
app.use("/calculation-cameras", calculationCameraRoutes);

//Proses Perhitungan AHP-TOPSIS
app.post("/topsis-calculation", TOPSISCalculation);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
