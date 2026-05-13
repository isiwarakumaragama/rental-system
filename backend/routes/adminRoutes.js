const express = require('express');
const { getAllVehicles, getAllUsers, approveVehicle, rejectVehicle } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/vehicles', getAllVehicles);
router.get('/users', getAllUsers);
router.put('/vehicles/:id/approve', approveVehicle);
router.put('/vehicles/:id/reject', rejectVehicle);

module.exports = router;
