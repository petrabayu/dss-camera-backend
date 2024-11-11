const dbPool = require("../config/database");

const getAllRelations = async () => {
  const SQLQuery = "SELECT * FROM user_cameras";
  return await dbPool.execute(SQLQuery);
};

const getRelation = async (id) => {
  const SQLQuery = `SELECT * FROM user_cameras WHERE user_id = ?`;
  return await dbPool.execute(SQLQuery, [id]);
};

const createNewRelation = async (body) => {
  const SQLQuery = `
    INSERT INTO user_cameras 
    VALUES (?, ?);
  `;

  const values = [body.user_id, body.camera_id];

  return await dbPool.execute(SQLQuery, values);
};

const deleteRelation = async (id) => {
  const SQLQuery = `DELETE FROM user_cameras WHERE user_id= ?`;

  return await dbPool.execute(SQLQuery, [id]);
};

module.exports = {
  getAllRelations,
  getRelation,
  createNewRelation,
  deleteRelation,
};
