const { pool } = require('../config/db');

// Get all approved vehicles (for users to browse)
const getVehicles = async (req, res) => {
  try {
    // First, mark vehicles as available if their rental period has expired
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    
    await pool.query(`
      UPDATE vehicles
      SET availability = 'available'
      WHERE availability = 'rented'
      AND id IN (
        SELECT DISTINCT vehicle_id
        FROM rental_requests
        WHERE status = 'approved'
        AND end_date < ?
      )
    `, [today]);

    const [vehicles] = await pool.query('SELECT v.*, u.name as owner_name FROM vehicles v JOIN users u ON v.owner_id = u.id WHERE v.approval_status = "approved"');
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single vehicle
const getVehicleById = async (req, res) => {
  try {
    // First, mark vehicles as available if their rental period has expired
    const today = new Date().toISOString().split('T')[0];
    
    await pool.query(`
      UPDATE vehicles
      SET availability = 'available'
      WHERE availability = 'rented'
      AND id IN (
        SELECT DISTINCT vehicle_id
        FROM rental_requests
        WHERE status = 'approved'
        AND end_date < ?
      )
    `, [today]);

    const [vehicle] = await pool.query('SELECT v.*, u.name as owner_name FROM vehicles v JOIN users u ON v.owner_id = u.id WHERE v.id = ?', [req.params.id]);
    if (vehicle.length === 0) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Owner: Add new vehicle
const addVehicle = async (req, res) => {
  try {
    const { vehicle_name, vehicle_type, vehicle_number, price_first_10km, price_per_km_after } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO vehicles (owner_id, vehicle_name, vehicle_type, vehicle_number, price_first_10km, price_per_km_after, approval_status) VALUES (?, ?, ?, ?, ?, ?, "pending")',
      [req.user.id, vehicle_name, vehicle_type, vehicle_number, price_first_10km, price_per_km_after]
    );
    res.status(201).json({ id: result.insertId, message: 'Vehicle added successfully and pending approval' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Owner: Update vehicle
const updateVehicle = async (req, res) => {
  try {
    const { vehicle_name, vehicle_type, vehicle_number, price_first_10km, price_per_km_after, availability } = req.body;
    
    // Check ownership
    const [vehicle] = await pool.query('SELECT * FROM vehicles WHERE id = ? AND owner_id = ?', [req.params.id, req.user.id]);
    if (vehicle.length === 0) return res.status(403).json({ message: 'Not authorized or vehicle not found' });

    await pool.query(
      'UPDATE vehicles SET vehicle_name = ?, vehicle_type = ?, vehicle_number = ?, price_first_10km = ?, price_per_km_after = ?, availability = ? WHERE id = ?',
      [vehicle_name, vehicle_type, vehicle_number, price_first_10km, price_per_km_after, availability, req.params.id]
    );
    res.json({ message: 'Vehicle updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Owner: Delete vehicle
const deleteVehicle = async (req, res) => {
  try {
    const [vehicle] = await pool.query('SELECT * FROM vehicles WHERE id = ? AND owner_id = ?', [req.params.id, req.user.id]);
    if (vehicle.length === 0) return res.status(403).json({ message: 'Not authorized or vehicle not found' });

    await pool.query('DELETE FROM vehicles WHERE id = ?', [req.params.id]);
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVehicles, getVehicleById, addVehicle, updateVehicle, deleteVehicle };
