const dbPool = require("../config/database");

const getAllWeights = async () => {
  const SQLQuery = "SELECT * FROM ahp_criteria_weights";
  return await dbPool.execute(SQLQuery);
};

const getWeight = async (id) => {
  const SQLQuery = `
  SELECT price_weight, pixel_weight, max_resolution_weight, sensor_size_weight, min_iso_weight, max_iso_weight, min_shutter_speed_weight, max_shutter_speed_weight, continues_drive_weight, max_video_resolution_weight, max_video_fps_weight, battery_life_weight, articulated_lcd_weight, screen_dots_weight, weight_weight 
  FROM ahp_criteria_weights WHERE id = ?`;
  const [rows] = await dbPool.execute(SQLQuery, [id]);
  return rows;
};

const createNewWeight = async (body) => {
  const SQLQuery = `
    INSERT INTO ahp_criteria_weights 
    (price_weight, pixel_weight, max_resolution_weight, sensor_size_weight, min_iso_weight, max_iso_weight, min_shutter_speed_weight, max_shutter_speed_weight, continues_drive_weight, max_video_resolution_weight, max_video_fps_weight, battery_life_weight, articulated_lcd_weight, screen_dots_weight, weight_weight)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?);
  `;

  const values = [
    body.price_weight,
    body.pixel_weight,
    body.max_resolution_weight,
    body.sensor_size_weight,
    body.min_iso_weight,
    body.max_iso_weight,
    body.min_shutter_speed_weight,
    body.max_shutter_speed_weight,
    body.continues_drive_weight,
    body.max_video_resolution_weight,
    body.max_video_fps_weight,
    body.battery_life_weight,
    body.articulated_lcd_weight,
    body.screen_dots_weight,
    body.weight_weight,
  ];

  return await dbPool.execute(SQLQuery, values);
};

const deleteWeight = async (id) => {
  const SQLQuery = `DELETE FROM ahp_criteria_weights WHERE id= ?`;

  return await dbPool.execute(SQLQuery, [id]);
};

module.exports = {
  getAllWeights,
  getWeight,
  createNewWeight,
  deleteWeight,
};
