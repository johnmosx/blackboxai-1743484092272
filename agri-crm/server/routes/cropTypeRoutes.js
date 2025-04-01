const express = require('express');
const router = express.Router();
const cropTypeController = require('../controllers/cropTypeController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Crop type management routes
router.post('/', roleMiddleware('Administrator'), cropTypeController.createCropType);
router.get('/', cropTypeController.getCropTypes);
router.put('/:id', roleMiddleware('Administrator'), cropTypeController.updateCropType);
router.delete('/:id', roleMiddleware('Administrator'), cropTypeController.deleteCropType);

module.exports = router;