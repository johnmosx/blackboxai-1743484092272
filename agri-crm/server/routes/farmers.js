const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

// Manager-only routes
router.post('/', roleMiddleware('Manager'), farmerController.createFarmer);
router.put('/:id', roleMiddleware('Manager'), farmerController.updateFarmer);
router.delete('/:id', roleMiddleware('Manager'), farmerController.deleteFarmer);
router.post('/:farmerId/fields', roleMiddleware('Manager'), farmerController.addFarmerField);

// Public routes
router.get('/', farmerController.getFarmers);
router.get('/:id', farmerController.getFarmerDetails);

module.exports = router;