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


// 创建帖子
exports.createPost = async (req, res) => {
    const { post_group, content, imgs } = req.body; // 接收前端传递的 imgs 数组
    const userId = req.userId; // 从 token 中获取的用户 ID
    const createTime = new Date(); // 帖子的创建时间

    try {
        // 插入帖子数据并获取插入后的结果，包含生成的帖子ID
        const [result] = await db.query('INSERT INTO posts (post_group, user_id, content, imgs, create_time) VALUES (?, ?, ?, ?, ?)',
            [post_group, userId, content, JSON.stringify(imgs), createTime]);

        const postId = result.insertId;

        // 查询插入的帖子信息
        const [posts] = await db.query(`
            SELECT 
                p.post_id, p.post_group, p.content, p.imgs, p.create_time, p.like_list, p.comments, p.user_id,
                u.username, u.avatar, u.tag
            FROM posts p
            JOIN users u ON p.user_id = u.user_id
            WHERE p.post_id = ?
        `, [postId]);

        if (posts.length === 0) {
            return res.status(404).json({ message: '未找到帖子' });
        }

        const formattedPost = formatPosts(posts)[0];
        res.status(201).json(formattedPost);

    } catch (error) {
        console.error('创建帖子时出错:', error); // 错误日志记录
        res.status(500).json({ message: '创建帖子时出错' });
    }
};

// 删除帖子
exports.deletePost = async (req, res) => {
    const { postId } = req.body;
    const userId = req.userId; // 从 token 中获取的用户 ID

    try {
        // 检查帖子是否存在并且属于当前用户
        const [posts] = await db.query('SELECT * FROM posts WHERE post_id = ? AND user_id = ?', [postId, userId]);

        if (posts.length === 0) {
            return res.status(403).json({ message: '无法删除：帖子不存在或你没有权限删除此帖子' });
        }

        // 删除帖子
        await db.query('DELETE FROM posts WHERE post_id = ?', [postId]);

        res.status(200).json({ message: '帖子删除成功' });
    } catch (error) {
        console.error('删除帖子时出错:', error);
        res.status(500).json({ message: '删除帖子时出错' });
    }
};

const serverConfig = require('../config/server-config');

// 上传图片
exports.uploadImages = (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: '没有上传文件' });
    }

    // const fileUrls = req.files.map(file => `${serverConfig.serverAddress}/uploads/${file.filename}`);
    const fileUrls = req.files.map(file => `/uploads/${file.filename}`);
    res.status(200).json({ urls: fileUrls });
};

// 点赞和取消点赞
exports.toggleLike = async (req, res) => {
    const { postId, type } = req.query; // 获取postId和type参数
    const userId = req.userId; // 从 token 中获取用户 ID

    try {
        // 查询帖子信息
        const [posts] = await db.query('SELECT like_list FROM posts WHERE post_id = ?', [postId]);

        if (posts.length === 0) {
            return res.status(404).json({ message: '未找到帖子' });
        }

        let likeList = posts[0].like_list ? JSON.parse(posts[0].like_list) : [];

        if (type === 'like') {
            // 添加用户ID到点赞列表
            if (!likeList.includes(userId)) {
                likeList.push(userId);
            }
        } else if (type === 'unlike') {
            // 从点赞列表中移除用户ID
            likeList = likeList.filter(id => id !== userId);
        } else {
            return res.status(400).json({ message: '无效的操作类型' });
        }

        // 更新帖子中的点赞列表
        await db.query('UPDATE posts SET like_list = ? WHERE post_id = ?', [JSON.stringify(likeList), postId]);

        res.status(200).json({ message: '操作成功', likeList });

    } catch (error) {
        console.error('处理点赞时出错:', error); // 错误日志记录
        res.status(500).json({ message: '处理点赞时出错' });
    }
};

// 创建评论
exports.createComment = async (req, res) => {
    const { postId, commentId, authorId, authorName, targetId, targetName, commentContent } = req.body;

    try {
        // 获取指定帖子的当前评论列表
        const [posts] = await db.query('SELECT comments FROM posts WHERE post_id = ?', [postId]);

        if (posts.length === 0) {
            return res.status(404).json({ message: '未找到帖子' });
        }

        let comments = posts[0].comments ? JSON.parse(posts[0].comments) : [];

        // 添加新的评论
        comments.push({ commentId, authorId, authorName, targetId, targetName, commentContent });

        // 更新数据库中的评论列表
        await db.query('UPDATE posts SET comments = ? WHERE post_id = ?', [JSON.stringify(comments), postId]);

        res.status(200).json({ message: '评论创建成功' });
    } catch (error) {
        console.error('创建评论时出错:', error);
        res.status(500).json({ message: '创建评论时出错' });
    }
};

// 删除评论
exports.deleteComment = async (req, res) => {
    const { postId, commentId } = req.body;

    try {
        // 获取指定帖子的当前评论列表
        const [posts] = await db.query('SELECT comments FROM posts WHERE post_id = ?', [postId]);

        if (posts.length === 0) {
            return res.status(404).json({ message: '未找到帖子' });
        }

        let comments = posts[0].comments ? JSON.parse(posts[0].comments) : [];

        // 过滤掉指定的评论
        let index = comments.findIndex(item => item.commentId === commentId)
        if (index !== -1) {
            comments.splice(index, 1)
        }
        // comments = comments.filter(comment => comment.commentId !== parseInt(commentId));

        // 更新数据库中的评论列表
        await db.query('UPDATE posts SET comments = ? WHERE post_id = ?', [JSON.stringify(comments), postId]);

        res.status(200).json({ message: '评论删除成功' });
    } catch (error) {
        console.error('删除评论时出错:', error);
        res.status(500).json({ message: '删除评论时出错' });
    }
};


