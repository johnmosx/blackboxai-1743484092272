const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');

// Create a new farmer
router.post('/', farmerController.createFarmer);

// Get all farmers
router.get('/', farmerController.getFarmers);

// Get a single farmer
router.get('/:id', farmerController.getFarmer);

// Update a farmer
router.put('/:id', farmerController.updateFarmer);

// Delete a farmer
router.delete('/:id', farmerController.deleteFarmer);

module.exports = router;