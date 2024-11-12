<div align="center">
  <img src="https://pic.imgdb.cn/item/66a3ac61d9c307b7e9b6cf51.webp" alt="Project Logo" width="200"/>
  <h1>小圆圈</h1>
</div>

## 简介

<img src="https://pic.imgdb.cn/item/66a3ac61d9c307b7e9b6cf51.webp" alt="Icon" width="16"/> 小圆圈，是一个校园社区平台。定位是校园交流社区。主要功能包括发帖，评论点赞等。圈子有推荐贴、表白墙贴、失物招领贴、校园新闻贴等分类。平台可根据需求进行功能扩展。

## 项目技术栈

### 前端

项目采用 <img style="vertical-align: -2px;" src="https://pic.imgdb.cn/item/66a271f3d9c307b7e9a094ef.webp" alt="Icon" width="15"/> Vue 3 进行开发，集成了 <img style="vertical-align: -2px;" src="https://pic.imgdb.cn/item/67060023d29ded1a8c50d345.png" alt="Icon" width="15"/> Axios 作为请求工具，使用 <img style="vertical-align: -2px;" src="https://pic.imgdb.cn/item/670605a3d29ded1a8c553e8b.png" alt="Icon" width="15"/> Pinia 进行状态管理，并通过 <img style="vertical-align: -2px;" src="https://pic.imgdb.cn/item/670605a3d29ded1a8c553e98.png" alt="Icon" width="15"/> Pinia Persistedstate 实现状态的持久化存储。路由管理则采用 <img style="vertical-align: -2px;" src="https://pic.imgdb.cn/item/66a271f3d9c307b7e9a094ef.webp" alt="Icon" width="15"/> VueRouter 4，确保应用页面的高效切换和管理。

### 后端

后端基于 <img style="vertical-align: -2px;" src="https://pic.imgdb.cn/item/6704eb32d29ded1a8c66e550.png" alt="Icon" width="15"/> Node.js 开发，整合了 <img style="vertical-align: -2px;" src="https://pic.imgdb.cn/item/670607dbd29ded1a8c56c509.png" alt="Icon" width="15"/> Express 框架构建 <img style="vertical-align: -2px;" src="https://pic.imgdb.cn/item/672123dbd29ded1a8c9298ba.png" alt="Icon" width="15"/> RESTful API，使用 <img style="vertical-align: -2px;" src="https://pic.imgdb.cn/item/670b9115d29ded1a8ce9aa61.png" alt="Icon" width="15"/> MySql2 进行数据库操作，并通过 <img style="vertical-align: -2px;" src="https://pic.imgdb.cn/item/672123dbd29ded1a8c9298cb.png" alt="Icon" width="15"/> jsonwebtoken 实现用户身份验证和授权，确保数据安全。
