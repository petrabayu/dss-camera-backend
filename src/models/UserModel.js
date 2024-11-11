const dbPool = require("../config/database");

const getAllUsers = async () => {
  const SQLQuery = "SELECT * FROM users";
  return await dbPool.execute(SQLQuery);
};

const createNewUser = async (body) => {
  const SQLQuery = `
    INSERT INTO users (username, email, password, role)
    VALUES (?, ?, ?, ?);
  `;

  const roleValue = body.role || "user"; // Default ke 'user' jika role tidak diberikan
  const values = [body.username, body.email, body.password, roleValue];

  return await dbPool.execute(SQLQuery, values);
};

const updateUser = async (body, id) => {
  // Ambil semua key dari body untuk di-update
  const fields = Object.keys(body);

  // Jika tidak ada field yang diberikan, lempar error
  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  // Buat bagian SET dari query secara dinamis
  const setClause = fields.map((field, index) => `${field} = ?`).join(", ");

  // Siapkan nilai-nilai yang akan di-update
  const values = fields.map((field) => body[field]);

  // Tambahkan ID di akhir untuk kondisi WHERE
  values.push(id);

  // Buat query SQL untuk update
  const SQLQuery = `
  UPDATE users
  SET ${setClause}
  WHERE id = ?`;

  return await dbPool.execute(SQLQuery, values);
};

const deleteUser = async (id) => {
  const SQLQuery = `DELETE FROM users WHERE id= ?`;

  return await dbPool.execute(SQLQuery, [id]);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
