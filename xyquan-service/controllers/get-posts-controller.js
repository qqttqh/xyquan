// controllers/postsController.js

const db = require('../config/db');

// 格式化帖子的辅助功能
const formatPosts = (posts) => {
    return posts.map(post => ({
        postId: post.post_id,
        postGroup: post.post_group,
        user: {
            userId: post.user_id,
            userName: post.username,
            userAvatar: post.avatar,
            userTag: post.tag ? JSON.parse(post.tag) : []
        },
        content: post.content,
        imgs: post.imgs ? JSON.parse(post.imgs) : [],
        createTime: post.create_time,
        likeList: post.like_list ? JSON.parse(post.like_list) : [],
        comments: post.comments ? JSON.parse(post.comments) : []
    }));
};

// 获取所有帖子列表，无需认证
exports.getAllPosts = async (req, res) => {
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const [posts] = await db.query(`
            SELECT 
                p.post_id, p.post_group, p.content, p.imgs, p.create_time, p.like_list, p.comments, p.user_id,
                u.username, u.avatar, u.tag
            FROM posts p
            JOIN users u ON p.user_id = u.user_id
            ORDER BY p.post_id DESC
            LIMIT ? OFFSET ?
        `, [limit, offset]);

        const formattedPosts = formatPosts(posts);
        res.json(formattedPosts);
    } catch (error) {
        res.status(500).json({ message: '获取帖子时出错' });
    }
};

// 获取自己的帖子列表，需认证
exports.getMyPosts = async (req, res) => {
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;
    const userId = req.userId;

    try {
        const [posts] = await db.query(`
            SELECT 
                p.post_id, p.post_group, p.content, p.imgs, p.create_time, p.like_list, p.comments, p.user_id,
                u.username, u.avatar, u.tag
            FROM posts p
            JOIN users u ON p.user_id = u.user_id
            WHERE p.user_id = ?
            ORDER BY p.post_id DESC
            LIMIT ? OFFSET ?
        `, [userId, limit, offset]);

        const formattedPosts = formatPosts(posts);
        res.json(formattedPosts);
    } catch (error) {
        res.status(500).json({ message: '获取帖子时出错' });
    }
};


// 获取日常贴帖子列表，无需认证
exports.getDailyPosts = async (req, res) => {
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const [posts] = await db.query(`
            SELECT 
                p.post_id, p.post_group, p.content, p.imgs, p.create_time, p.like_list, p.comments, p.user_id,
                u.username, u.avatar, u.tag
            FROM posts p
            JOIN users u ON p.user_id = u.user_id
            WHERE p.post_group = 'Daily'
            ORDER BY p.post_id DESC
            LIMIT ? OFFSET ?
        `, [limit, offset]);

        const formattedPosts = formatPosts(posts);
        res.json(formattedPosts);
    } catch (error) {
        res.status(500).json({ message: '获取每日帖子时出错' });
    }
};

// 获取表白墙帖子列表，无需认证
exports.getConfessionPosts = async (req, res) => {
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const [posts] = await db.query(`
            SELECT 
                p.post_id, p.post_group, p.content, p.imgs, p.create_time, p.like_list, p.comments, p.user_id,
                u.username, u.avatar, u.tag
            FROM posts p
            JOIN users u ON p.user_id = u.user_id
            WHERE p.post_group = 'ConfessionWall'
            ORDER BY p.post_id DESC
            LIMIT ? OFFSET ?
        `, [limit, offset]);

        const formattedPosts = formatPosts(posts);
        res.json(formattedPosts);
    } catch (error) {
        res.status(500).json({ message: '获取表白墙帖子时出错' });
    }
};

// 获取失物招领帖子列表，无需认证
exports.getLostFoundPosts = async (req, res) => {
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const [posts] = await db.query(`
            SELECT 
                p.post_id, p.post_group, p.content, p.imgs, p.create_time, p.like_list, p.comments, p.user_id,
                u.username, u.avatar, u.tag
            FROM posts p
            JOIN users u ON p.user_id = u.user_id
            WHERE p.post_group = 'LostAndFound'
            ORDER BY p.post_id DESC
            LIMIT ? OFFSET ?
        `, [limit, offset]);

        const formattedPosts = formatPosts(posts);
        res.json(formattedPosts);
    } catch (error) {
        res.status(500).json({ message: '获取失物招领帖子时出错' });
    }
};

// 获取校园新闻帖子列表，无需认证
exports.getSchoolNewsPosts = async (req, res) => {
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const [posts] = await db.query(`
            SELECT 
                p.post_id, p.post_group, p.content, p.imgs, p.create_time, p.like_list, p.comments, p.user_id,
                u.username, u.avatar, u.tag
            FROM posts p
            JOIN users u ON p.user_id = u.user_id
            WHERE p.post_group = 'SchoolNews'
            ORDER BY p.post_id DESC
            LIMIT ? OFFSET ?
        `, [limit, offset]);

        const formattedPosts = formatPosts(posts);
        res.json(formattedPosts);
    } catch (error) {
        res.status(500).json({ message: '获取学校新闻帖子时出错' });
    }
};
