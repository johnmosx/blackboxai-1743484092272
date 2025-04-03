const express = require('express');
const router = express.Router();
const phenologyStageController = require('../controllers/phenologyStageController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

// Admin-only routes
router.post('/', roleMiddleware('Administrator'), phenologyStageController.createStage);
router.put('/:id', roleMiddleware('Administrator'), phenologyStageController.updateStage);
router.delete('/:id', roleMiddleware('Administrator'), phenologyStageController.deleteStage);

// Public routes
router.get('/crop-type/:cropTypeId', phenologyStageController.getStagesForCropType);

module.exports = router;