// getPosts.js
import api from './api';
import { useUserStore } from '@/stores/user';
import { usePostStore } from '@/stores/post';

const userStore = useUserStore();
const postStore = usePostStore();

// 请求10条帖子
export const getPosts = async (page = 1) => {
    try {
        const response = await api.get('/get-posts', { params: { page } });
        const posts = response.data.map(post => ({
            postId: post.postId,
            postGroup: post.postGroup,
            user: {
                userId: post.user.userId,
                userName: post.user.userName,
                userAvatar: post.user.userAvatar,
                userTag: post.user.userTag
            },
            content: post.content,
            imgs: post.imgs,
            createTime: post.createTime,
            likeList: post.likeList,
            comments: post.comments
        }));
        postStore.addPosts(posts); // 更新 Store 中的 data
        return posts;
    } catch (error) {
        console.error('获取10条帖子时出错：', error);
        throw error;
    }
};

// 请求用户自己的帖子
export const getMyPosts = async (page = 1) => {
    try {
        const response = await api.get('/get-posts/my-posts', { params: { page } });
        const posts = response.data.map(post => ({
            postId: post.postId,
            postGroup: post.postGroup,
            user: {
                userId: post.user.userId,
                userName: post.user.userName,
                userAvatar: post.user.userAvatar,
                userTag: post.user.userTag
            },
            content: post.content,
            imgs: post.imgs,
            createTime: post.createTime,
            likeList: post.likeList,
            comments: post.comments
        }));
        userStore.addPosts(posts); // 更新 Store 中的 data
        return posts;
    } catch (error) {
        console.error('获取自己的帖子时出错：', error);
        throw error;
    }
};

// 请求日常分类的帖子
export const getDailyPosts = async (page = 1) => {
    try {
        const response = await api.get('/get-posts/daily', { params: { page } });
        const posts = response.data.map(post => ({
            postId: post.postId,
            postGroup: post.postGroup,
            user: {
                userId: post.user.userId,
                userName: post.user.userName,
                userAvatar: post.user.userAvatar,
                userTag: post.user.userTag
            },
            content: post.content,
            imgs: post.imgs,
            createTime: post.createTime,
            likeList: post.likeList,
            comments: post.comments
        }));
        postStore.addPosts(posts); // 更新 Store 中的 data
        return posts;
    } catch (error) {
        console.error('获取日常帖子时出错：', error);
        throw error;
    }
};

// 请求表白墙的帖子
export const getConfessionPosts = async (page = 1) => {
    try {
        const response = await api.get('/get-posts/confession', { params: { page } });
        const posts = response.data.map(post => ({
            postId: post.postId,
            postGroup: post.postGroup,
            user: {
                userId: post.user.userId,
                userName: post.user.userName,
                userAvatar: post.user.userAvatar,
                userTag: post.user.userTag
            },
            content: post.content,
            imgs: post.imgs,
            createTime: post.createTime,
            likeList: post.likeList,
            comments: post.comments
        }));
        postStore.addPosts(posts); // 更新 Store 中的 data
        return posts;
    } catch (error) {
        console.error('获取表白墙帖子时出错：', error);
        throw error;
    }
};

// 请求失物招领的帖子
export const getLostFoundPosts = async (page = 1) => {
    try {
        const response = await api.get('/get-posts/lost-found', { params: { page } });
        const posts = response.data.map(post => ({
            postId: post.postId,
            postGroup: post.postGroup,
            user: {
                userId: post.user.userId,
                userName: post.user.userName,
                userAvatar: post.user.userAvatar,
                userTag: post.user.userTag
            },
            content: post.content,
            imgs: post.imgs,
            createTime: post.createTime,
            likeList: post.likeList,
            comments: post.comments
        }));
        postStore.addPosts(posts); // 更新 Store 中的 data
        return posts;
    } catch (error) {
        console.error('请求失物招领帖子时出错：', error);
        throw error;
    }
};

// 请求校园新闻的帖子
export const getSchoolNewsPosts = async (page = 1) => {
    try {
        const response = await api.get('/get-posts/school-news', { params: { page } });
        const posts = response.data.map(post => ({
            postId: post.postId,
            postGroup: post.postGroup,
            user: {
                userId: post.user.userId,
                userName: post.user.userName,
                userAvatar: post.user.userAvatar,
                userTag: post.user.userTag
            },
            content: post.content,
            imgs: post.imgs,
            createTime: post.createTime,
            likeList: post.likeList,
            comments: post.comments
        }));
        postStore.addPosts(posts); // 更新 Store 中的 data
        return posts;
    } catch (error) {
        console.error('获取学校新闻帖子时出错：', error);
        throw error;
    }
};