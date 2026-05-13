const { pool } = require('../config/db');

// Get all vehicles (Admin can see all including pending/rejected)
const getAllVehicles = async (req, res) => {
  try {
    const [vehicles] = await pool.query('SELECT v.*, u.name as owner_name FROM vehicles v JOIN users u ON v.owner_id = u.id');
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role, created_at FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve vehicle
const approveVehicle = async (req, res) => {
  try {
    await pool.query('UPDATE vehicles SET approval_status = "approved" WHERE id = ?', [req.params.id]);
    res.json({ message: 'Vehicle approved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject vehicle
const rejectVehicle = async (req, res) => {
  try {
    await pool.query('UPDATE vehicles SET approval_status = "rejected" WHERE id = ?', [req.params.id]);
    res.json({ message: 'Vehicle rejected' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllVehicles, getAllUsers, approveVehicle, rejectVehicle };
