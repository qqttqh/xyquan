// middleware/authMiddleware.js

const jwt = require('jsonwebtoken'); // 导入jsonwebtoken用于验证token
const jwtsConfig = require('../config/jwts-config');

// 认证中间件
module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']; // 从请求头中获取token
    const token = authHeader && authHeader.split(' ')[1]; // 如果有Bearer前缀，去掉它

    if (!token) {
        // 如果没有提供token，返回401状态码
        return res.status(401).json({ message: '未经授权：未提供令牌' });
    }

    // 验证token
    jwt.verify(token, jwtsConfig.jwtSecret, (err, decoded) => {
        if (err) {
            // 如果token验证失败，返回401状态码
            return res.status(401).json({ message: '未授权：无法验证令牌' });
        }

        // 如果验证成功，将用户ID添加到请求对象中
        req.userId = decoded.userId;
        next(); // 调用下一个中间件或路由处理器
    });
};

