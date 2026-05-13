const express = require('express');
const { getVehicles, getVehicleById, addVehicle, updateVehicle, deleteVehicle } = require('../controllers/vehicleController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const router = express.Router();

router.route('/')
  .get(getVehicles)
  .post(protect, authorize('owner'), addVehicle);

router.route('/:id')
  .get(getVehicleById)
  .put(protect, authorize('owner'), updateVehicle)
  .delete(protect, authorize('owner'), deleteVehicle);

module.exports = router;
