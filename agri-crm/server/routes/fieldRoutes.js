const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Field management routes
router.post('/', roleMiddleware('Manager'), fieldController.createField);
router.get('/farmer/:farmerId', fieldController.getFarmerFields);

// Field history routes
router.post('/:fieldId/history', roleMiddleware('Manager'), fieldController.addFieldHistory);
router.put('/:fieldId/crop', roleMiddleware('Manager'), fieldController.updateFieldCrop);

module.exports = router;