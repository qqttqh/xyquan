// controllers/usersController.js

const db = require('../config/db');

// 更新用户信息
exports.updateUser = async (req, res) => {
    const userId = req.userId; // 从 token 中获取的用户 ID
    const { userName, avatar, tag } = req.body;

    try {
        const updates = [];
        const values = [];

        if (userName) {
            updates.push('username = ?');
            values.push(userName);
        }
        if (avatar) {
            updates.push('avatar = ?');
            values.push(avatar);
        }
        if (tag) {
            updates.push('tag = ?');
            values.push(JSON.stringify(tag));
        }

        if (updates.length === 0) {
            return res.status(400).json({ message: '没有提供任何更新内容' });
        }

        values.push(userId);

        const query = `UPDATE users SET ${updates.join(', ')} WHERE user_id = ?`;
        await db.query(query, values);

        res.status(200).json({ message: '用户信息更新成功' });
    } catch (error) {
        console.error('更新用户信息时出错:', error);
        res.status(500).json({ message: '更新用户信息时出错' });
    }
};
