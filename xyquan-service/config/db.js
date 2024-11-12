 // config/db.js
const { createPool } = require('mysql2');
require('dotenv').config();

// 创建MySQL连接池
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// 导出Promise风格的连接池
module.exports = pool.promise();
