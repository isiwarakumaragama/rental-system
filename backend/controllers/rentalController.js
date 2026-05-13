const { pool } = require('../config/db');

// Create rental request (User)
const requestRental = async (req, res) => {
  try {
    const { vehicle_id, start_date, end_date } = req.body;
    
    const [vehicle] = await pool.query('SELECT availability FROM vehicles WHERE id = ?', [vehicle_id]);
    if (vehicle.length === 0) return res.status(404).json({ message: 'Vehicle not found' });
    if (vehicle[0].availability !== 'available') return res.status(400).json({ message: 'Vehicle not available' });

    const [result] = await pool.query(
      'INSERT INTO rental_requests (user_id, vehicle_id, start_date, end_date, status) VALUES (?, ?, ?, ?, "pending")',
      [req.user.id, vehicle_id, start_date, end_date]
    );
    res.status(201).json({ id: result.insertId, message: 'Rental request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get rentals (User gets their own, Owner gets requests for their vehicles)
const getRentals = async (req, res) => {
  try {
    if (req.user.role === 'user') {
      const [rentals] = await pool.query(`
        SELECT r.*, v.vehicle_name, v.vehicle_type 
        FROM rental_requests r JOIN vehicles v ON r.vehicle_id = v.id 
        WHERE r.user_id = ?
      `, [req.user.id]);
      return res.json(rentals);
    } else if (req.user.role === 'owner') {
      const [rentals] = await pool.query(`
        SELECT r.*, v.vehicle_name, u.name as customer_name 
        FROM rental_requests r 
        JOIN vehicles v ON r.vehicle_id = v.id 
        JOIN users u ON r.user_id = u.id 
        WHERE v.owner_id = ?
      `, [req.user.id]);
      return res.json(rentals);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve/Reject rental (Owner)
const updateRentalStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'
    
    // verify ownership of vehicle
    const [rental] = await pool.query(`
      SELECT r.*, v.owner_id FROM rental_requests r 
      JOIN vehicles v ON r.vehicle_id = v.id 
      WHERE r.id = ?
    `, [req.params.id]);

    if (rental.length === 0) return res.status(404).json({ message: 'Rental not found' });
    if (rental[0].owner_id !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await pool.query('UPDATE rental_requests SET status = ? WHERE id = ?', [status, req.params.id]);
    
    // if approved, mark vehicle as rented
    if (status === 'approved') {
      await pool.query('UPDATE vehicles SET availability = "rented" WHERE id = ?', [rental[0].vehicle_id]);
    }

    res.json({ message: `Rental ${status} successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { requestRental, getRentals, updateRentalStatus };
