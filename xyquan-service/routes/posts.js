// routes/posts.js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts-controller');
const authMiddleware = require('../middleware/auth-middleware');
const upload = require('../middleware/upload-middleware'); // 导入上传中间件

// 创建帖子，需认证
router.post('/', authMiddleware, postsController.createPost);

// 创建帖子，需认证
router.post('/delete', authMiddleware, postsController.deletePost);

// 上传图片，需认证
router.post('/upload', authMiddleware, upload.array('images', 9), postsController.uploadImages);

// 点赞，需认证
router.get('/toggle-like', authMiddleware, postsController.toggleLike);

// 创建评论，需认证
router.post('/create-comment', authMiddleware, postsController.createComment);

// 删除评论，需认证
router.post('/delete-comment', authMiddleware, postsController.deleteComment);

module.exports = router;