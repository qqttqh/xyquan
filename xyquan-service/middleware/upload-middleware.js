// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const serverConfig = require('../config/server-config'); // 引入服务端配置

// 确保uploads目录存在
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 配置multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

module.exports = upload;
