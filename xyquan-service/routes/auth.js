// routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller'); // 导入认证控制器

// 定义注册路由
router.post('/register', authController.register);
// 定义登录路由
router.post('/login', authController.login);

module.exports = router;
