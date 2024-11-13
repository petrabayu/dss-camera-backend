const dbPool = require("../config/database");

const sensorSizeMapping = {
  '1/2.3"': 1,
  '1/1.7"': 2,
  '2/3"': 3,
  '1"': 4,
  "Four Thirds": 5,
  "APS-C": 6,
  "APS-H": 7,
  "Full Frame": 8,
  "Medium Format": 9,
};

const articulatedLCDMapping = {
  Fixed: 1,
  Tilting: 2,
  "Fully Articulated": 3,
};

const createNewCamera = async (body) => {
  let shutterSpeedMax = body.max_shutter_speed;
  if (typeof shutterSpeedMax === "string" && shutterSpeedMax.includes("/")) {
    const parts = shutterSpeedMax.split("/");
    if (parts.length === 2 && parts[0] === "1") {
      shutterSpeedMax = 1 / parseFloat(parts[1]);
    }
  }

  let shutterSpeedMin = body.min_shutter_speed;
  if (typeof shutterSpeedMin === "string" && shutterSpeedMin.includes("/")) {
    const parts = shutterSpeedMin.split("/");
    if (parts.length === 2 && parts[0] === "1") {
      shutterSpeedMin = 1 / parseFloat(parts[1]);
    }
  }

  const SQLQuery = `
      INSERT INTO cameras
      (camera_name, price, pixel, max_resolution_width, max_resolution_length, sensor_size, min_iso, max_iso, min_shutter_speed, max_shutter_speed, continues_drive, max_video_resolution_width, max_video_resolution_length, max_video_fps, battery_life, articulated_lcd, screen_dots, weight, user_id) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
    `;

  const values = [
    body.camera_name,
    body.price,
    body.pixel,
    body.max_resolution_width,
    body.max_resolution_length,
    body.sensor_size,
    body.min_iso,
    body.max_iso,
    shutterSpeedMin,
    shutterSpeedMax,
    body.continues_drive,
    body.max_video_resolution_width,
    body.max_video_resolution_length,
    body.max_video_fps,
    body.battery_life,
    body.articulated_lcd,
    body.screen_dots,
    body.weight,
    body.user_id,
  ];

  return await dbPool.execute(SQLQuery, values);
};

const getAllCameras = async () => {
  const SQLQuery = "SELECT * FROM cameras";

  return await dbPool.execute(SQLQuery);
};

const getCameraById = async (id) => {
  const SQLQuery = `
  SELECT camera_name,price,pixel,max_resolution,sensor_size,min_iso,max_iso,min_shutter_speed,max_shutter_speed,continues_drive,max_video_resolution,max_video_fps,battery_life,articulated_lcd,screen_dots,weight 
  FROM cameras WHERE id = ?`;

  return await dbPool.execute(SQLQuery, [id]);
};

const getSelectedCameras = async (id) => {
  const placeholders = id.map(() => "?").join(",");
  const SQLQuery = `
  SELECT *
  FROM cameras WHERE id IN (${placeholders})`;

  // price,pixel,max_resolution,sensor_size,min_iso,max_iso,min_shutter_speed,max_shutter_speed,continues_drive,max_video_resolution,max_video_fps,battery_life,articulated_lcd,screen_dots,weight
  const [rows] = await dbPool.execute(SQLQuery, id);

  const formattedRows = rows.map((camera) => {
    return {
      id: camera.id,
      camera_name: camera.camera_name,
      price: camera.price,
      pixel: camera.pixel,
      max_resolution: camera.max_resolution,
      sensor_size: sensorSizeMapping[camera.sensor_size] || null,
      min_iso: camera.min_iso,
      max_iso: camera.max_iso,
      min_shutter_speed: camera.min_shutter_speed,
      max_shutter_speed: camera.max_shutter_speed,
      continues_drive: camera.continues_drive,
      max_video_resolution: camera.max_video_resolution,
      max_video_fps: camera.max_video_fps,
      battery_life: camera.battery_life,
      articulated_lcd: articulatedLCDMapping[camera.articulated_lcd] || null,
      screen_dots: camera.screen_dots,
      weight: camera.weight,
    };
  });

  return formattedRows;
};

const updateCamera = async (id, updateQuery) => {
  const { updates, values } = updateQuery;
  values.push(id);

  const SQLQuery = `
    UPDATE cameras 
    SET ${updates} 
    WHERE id = ?;
  `;

  const [result] = await dbPool.execute(SQLQuery, values);
  
  if (result.affectedRows === 0) {
    throw new Error(`Camera with id ${id} not found.`);
  }
  return result;
};

const deleteCamera = async (id) => {
  const SQLQuery = `DELETE FROM cameras WHERE id = ?`;

  // Execute the delete query
  const [result] = await dbPool.execute(SQLQuery, [id]);

  // Check if any row was deleted
  if (result.affectedRows === 0) {
    throw new Error(`Camera with id ${id} not found.`);
  }

  return result;
};

module.exports = {
  createNewCamera,
  getAllCameras,
  getCameraById,
  getSelectedCameras,
  updateCamera,
  deleteCamera,
};
