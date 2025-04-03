const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

// Manager-only routes
router.post('/', roleMiddleware('Manager'), fieldController.addFieldWithHistory);
router.put('/:id', roleMiddleware('Manager'), fieldController.updateField);
router.delete('/:id', roleMiddleware('Manager'), fieldController.deleteField);

// Public routes
router.get('/:id', fieldController.getFieldWithHistory);

module.exports = router;