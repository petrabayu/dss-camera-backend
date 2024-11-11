const dbPool = require("../config/database");

const getAllRelations = async () => {
  const SQLQuery = "SELECT * FROM calculation_cameras";
  return await dbPool.execute(SQLQuery);
};

const getRelation = async (id) => {
  const SQLQuery = `SELECT * FROM calculation_cameras WHERE calculation_id = ?`;
  return await dbPool.execute(SQLQuery, [id]);
};

const createNewRelation = async (body) => {
  const SQLQuery = `
    INSERT INTO calculation_cameras 
    VALUES (?, ?);
  `;

  const values = [body.calculation_id, body.camera_id];

  return await dbPool.execute(SQLQuery, values);
};

const deleteRelation = async (id) => {
  const SQLQuery = `DELETE FROM calculation_cameras WHERE calculation_id= ?`;

  return await dbPool.execute(SQLQuery, [id]);
};

module.exports = {
  getAllRelations,
  getRelation,
  createNewRelation,
  deleteRelation,
};
