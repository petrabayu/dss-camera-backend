const cameraPostValidation = (req, res, next) => {
  const body = req.body;

  // Check for required fields
  if (!body.camera_name) {
    return res.status(400).json({ error: "Camera name is required" });
  }
  if (!body.price && body.price !== 0) {
    return res.status(400).json({ error: "Price is required" });
  }
  if (!body.pixel && body.pixel !== 0) {
    return res.status(400).json({ error: "Pixel value is required" });
  }
  if (!body.max_resolution_width && body.max_resolution_width !== 0) {
    return res.status(400).json({ error: "Max resolution width is required" });
  }
  if (!body.max_resolution_length && body.max_resolution_length !== 0) {
    return res.status(400).json({ error: "Max resolution length is required" });
  }
  if (!body.sensor_size) {
    return res.status(400).json({ error: "Sensor size is required" });
  }
  if (!body.min_iso && body.min_iso !== 0) {
    return res.status(400).json({ error: "Minimum ISO is required" });
  }
  if (!body.max_iso && body.max_iso !== 0) {
    return res.status(400).json({ error: "Maximum ISO is required" });
  }
  if (!body.min_shutter_speed && body.min_shutter_speed !== 0) {
    return res.status(400).json({ error: "Minimum shutter speed is required" });
  }
  if (!body.continues_drive && body.continues_drive !== 0) {
    return res.status(400).json({ error: "Continues drive is required" });
  }
  if (!body.max_video_resolution_width && body.max_video_resolution_width !== 0) {
    return res.status(400).json({ error: "Max video resolution width is required" });
  }
  if (!body.max_video_resolution_length && body.max_video_resolution_length !== 0) {
    return res.status(400).json({ error: "Max video resolution length is required" });
  }
  if (!body.max_video_fps && body.max_video_fps !== 0) {
    return res.status(400).json({ error: "Max video FPS is required" });
  }
  if (!body.battery_life && body.battery_life !== 0) {
    return res.status(400).json({ error: "Battery life is required" });
  }
  if (!body.articulated_lcd) {
    return res.status(400).json({ error: "Articulated LCD is required" });
  }
  if (!body.screen_dots) {
    return res.status(400).json({ error: "Screen dots is required" });
  }
  if (!body.weight && body.weight !== 0) {
    return res.status(400).json({ error: "Weight is required" });
  }
  if (!body.user_id && body.user_id !== 0) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // If all validations pass, move to the next middleware or route handler
  next();
};

// Middleware to validate and prepare update data for a camera
const prepareUpdateCameraData = (req, res, next) => {
  const body = req.body;
  const updates = [];
  const values = [];

  // Check for each property and add to the update list if provided
  if (body.camera_name) {
    updates.push("camera_name = ?");
    values.push(body.camera_name);
  }
  if (body.price) {
    updates.push("price = ?");
    values.push(body.price);
  }
  if (body.pixel) {
    updates.push("pixel = ?");
    values.push(body.pixel);
  }
  if (body.max_resolution_width) {
    updates.push("max_resolution_width = ?");
    values.push(body.max_resolution_width);
  }
  if (body.max_resolution_length) {
    updates.push("max_resolution_length = ?");
    values.push(body.max_resolution_length);
  }
  if (body.sensor_size) {
    updates.push("sensor_size = ?");
    values.push(body.sensor_size);
  }
  if (body.min_iso) {
    updates.push("min_iso = ?");
    values.push(body.min_iso);
  }
  if (body.max_iso) {
    updates.push("max_iso = ?");
    values.push(body.max_iso);
  }
  if (body.min_shutter_speed) {
    updates.push("min_shutter_speed = ?");
    values.push(body.min_shutter_speed);
  }
  if (body.max_shutter_speed) {
    updates.push("max_shutter_speed = ?");
    values.push(body.max_shutter_speed);
  }
  if (body.continues_drive) {
    updates.push("continues_drive = ?");
    values.push(body.continues_drive);
  }
  if (body.max_video_resolution_width) {
    updates.push("max_video_resolution_width = ?");
    values.push(body.max_video_resolution_width);
  }
  if (body.max_video_resolution_length) {
    updates.push("max_video_resolution_length = ?");
    values.push(body.max_video_resolution_length);
  }
  if (body.max_video_fps) {
    updates.push("max_video_fps = ?");
    values.push(body.max_video_fps);
  }
  if (body.battery_life) {
    updates.push("battery_life = ?");
    values.push(body.battery_life);
  }
  if (body.articulated_lcd) {
    updates.push("articulated_lcd = ?");
    values.push(body.articulated_lcd);
  }
  if (body.screen_dots) {
    updates.push("screen_dots = ?");
    values.push(body.screen_dots);
  }
  if (body.weight) {
    updates.push("weight = ?");
    values.push(body.weight);
  }
  if (body.user_id) {
    updates.push("user_id = ?");
    values.push(body.user_id);
  }

  // If no fields are provided, return an error
  if (updates.length === 0) {
    return res.status(400).json({ error: "No fields provided for update." });
  }

  // Attach the update query parts to the request object
  req.updateQuery = {
    updates: updates.join(", "),
    values,
  };

  next();
};

module.exports = { cameraPostValidation, prepareUpdateCameraData };
