// routes/users.js

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');
const authMiddleware = require('../middleware/auth-middleware');

// 更新用户信息
router.post('/update', authMiddleware, usersController.updateUser);

module.exports = router;
