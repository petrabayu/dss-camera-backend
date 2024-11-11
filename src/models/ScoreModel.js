const dbPool = require("../config/database");

const getAllScores = async () => {
  const SQLQuery = "SELECT * FROM topsis_scores";
  return await dbPool.execute(SQLQuery);
};

const getScore = async (id) => {
  const SQLQuery = `SELECT * FROM topsis_scores WHERE id = ?`;
  return await dbPool.execute(SQLQuery, [id]);
};

const createNewScore = async (body) => {
  const SQLQuery = `
    INSERT INTO topsis_scores (camera_id,pis_score,nis_score)
    VALUES (?, ?, ?);
  `;

  const values = [body.camera_id, body.pis_score, body.nis_score];

  return await dbPool.execute(SQLQuery, values);
};

const deleteScore = async (id) => {
  const SQLQuery = `DELETE FROM topsis_scores WHERE id= ?`;

  return await dbPool.execute(SQLQuery, [id]);
};

module.exports = {
  getAllScores,
  getScore,
  createNewScore,
  deleteScore,
};
