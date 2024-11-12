// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const getPostRoutes = require('./routes/get-posts');

app.use(cors());

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/posts', postRoutes);
app.use('/get-posts', getPostRoutes);

// 配置静态文件目录
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(process.env.PORT, () => {
    console.log(`服务器正在端口 ${process.env.PORT} 上运行`);
});
