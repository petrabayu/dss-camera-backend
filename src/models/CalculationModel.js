const dbPool = require("../config/database");

const getAllCalculations = async () => {
  const SQLQuery = "SELECT * FROM calculations";
  return await dbPool.execute(SQLQuery);
};

const getCalculation = async (id) => {
  const SQLQuery = `SELECT * FROM calculations WHERE id = ?`;
  return await dbPool.execute(SQLQuery, [id]);
};

const createNewCalculation = async (body) => {
  const SQLQuery = `
    INSERT INTO calculations (calculation_name,user_id,camera_id,ahp_criteria_weight_id,topsis_score_id)
    VALUES (?, ?, ?, ?, ?);
  `;

  const values = [
    body.calculation_name,
    body.user_id,
    body.camera_id,
    body.ahp_criteria_weight_id,
    body.topsis_score_id,
  ];

  return await dbPool.execute(SQLQuery, values);
};

const deleteCalculation = async (id) => {
  const SQLQuery = `DELETE FROM calculations WHERE id= ?`;

  return await dbPool.execute(SQLQuery, [id]);
};

module.exports = {
  getAllCalculations,
  getCalculation,
  createNewCalculation,
  deleteCalculation,
};
