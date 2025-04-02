const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// User management routes
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.post('/change-password', userController.changePassword);
router.put('/:id', roleMiddleware('Administrator'), userController.updateUser);
router.delete('/:id', roleMiddleware('Administrator'), userController.deleteUser);

module.exports = router;
