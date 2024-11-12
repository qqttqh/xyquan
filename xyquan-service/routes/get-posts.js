// routes/posts.js
const express = require('express');
const router = express.Router();
const getPostsController = require('../controllers/get-posts-controller');
const authMiddleware = require('../middleware/auth-middleware');

// 获取所有帖子列表，无需认证
router.get('/', getPostsController.getAllPosts);

// 获取自己的帖子列表，需认证
router.get('/my-posts', authMiddleware, getPostsController.getMyPosts);

// 获取日常贴帖子列表，无需认证
router.get('/daily', getPostsController.getDailyPosts);

// 获取表白墙帖子列表，无需认证
router.get('/confession', getPostsController.getConfessionPosts);

// 获取失物招领帖子列表，无需认证
router.get('/lost-found', getPostsController.getLostFoundPosts);

// 获取校园新闻帖子列表，无需认证
router.get('/school-news', getPostsController.getSchoolNewsPosts);

module.exports = router;