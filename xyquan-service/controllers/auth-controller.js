// controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const jwtsConfig = require('../config/jwts-config');

const defaultAvatar = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png';
const defaultTag = '[{"title":"0级","type":"grade"}]'

// 生成随机用户名的函数
const generateRandomUsername = () => {
    return 'user_' + Math.floor(Math.random() * 1000000); // 简单的随机用户名生成器
};

// 注册
exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 检查邮箱是否已存在
        const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: '电子邮件已经存在' });
        }

        const username = generateRandomUsername(); // 生成随机用户名
        const hashedPassword = await bcrypt.hash(password, 10); // 加密密码

        const [result] = await db.query(
            'INSERT INTO users (username, email, password, avatar, tag, token) VALUES (?, ?, ?, ?, ?, ?)',
            [username, email, hashedPassword, defaultAvatar, defaultTag, '']
        );
        const token = jwt.sign({ userId: result.insertId }, jwtsConfig.jwtSecret, { expiresIn: '180d' }); // 生成token

        res.status(201).json({
            message: '用户注册成功',
            token: token,
            user: {
                userId: result.insertId,
                userEmail: email,
                userName: username,
                userAvatar: defaultAvatar,
                userTag: JSON.parse(defaultTag)
            }
        });
    } catch (error) {
        console.error('注册用户时出错：', error);
        res.status(500).json({ message: '注册用户时出错' });
    }
};

// 登录
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT user_id, email, username, avatar, password, tag FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: '邮箱不存在' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: '密码错误' });
        }

        const token = jwt.sign({ userId: user.user_id }, jwtsConfig.jwtSecret, { expiresIn: '180d' });

        await db.query('UPDATE users SET token = ? WHERE user_id = ?', [token, user.user_id]);

        return res.json({
            token,
            user: {
                userId: user.user_id,
                userEmail: user.email,
                userName: user.username,
                userAvatar: user.avatar,
                userTag: user.tag ? JSON.parse(user.tag) : []
            }
        });
    } catch (error) {
        console.error('用户登录时出错：', error);
        return res.status(500).json({ message: '用户登录时出错' });
    }
};




