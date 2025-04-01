const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// User management routes
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.post('/change-password', userController.changePassword);

module.exports = router;