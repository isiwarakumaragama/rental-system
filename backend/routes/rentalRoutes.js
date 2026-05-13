const express = require('express');
const { requestRental, getRentals, updateRentalStatus } = require('../controllers/rentalController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getRentals)
  .post(protect, authorize('user'), requestRental);

router.route('/:id/status')
  .put(protect, authorize('owner'), updateRentalStatus);

module.exports = router;
