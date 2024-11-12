// post.js
import api from './api';
import { useUserStore } from '@/stores/user';
import { usePostStore } from '@/stores/post';

const userStore = useUserStore();
const postStore = usePostStore();

// 上传图片
export const uploadImages = async (images) => {
    try {
        const formData = new FormData();
        images.forEach(image => {
            formData.append('images', image);
        });

        const response = await api.post('/posts/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;  // 假设后端返回的响应结构中包含图片URL数组
    } catch (error) {
        console.error('上传图片时出错：', error);
        throw error;
    }
};

// 创建帖子
export const createPost = async (post_group, content, imageUrls) => {
    try {
        const response = await api.post('/posts', { post_group, content, imgs: imageUrls });
        const post = response.data;

        const formattedPost = {
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
        };

        postStore.unshiftPosts([formattedPost]); // 更新 Store 中的单个 post 数据
        userStore.nushiftPosts([formattedPost]);
        return formattedPost;
    } catch (error) {
        console.error('创建帖子时出错：', error);
        throw error;
    }
};

// 删除帖子
export const deletePost = async (postId) => {
    try {
        const response = await api.post('/posts/delete', { postId });
        return response.data;
    } catch (error) {
        console.error('删除帖子时出错：', error);
        throw error;
    }
};

// 点赞/取消点赞
export const toggleLike = async (postId, type) => {
    try {
        // 发送点赞/取消点赞的请求
        await api.get(`/posts/toggle-like?postId=${postId}&type=${type}`);
    } catch (error) {
        console.error('错误切换如下：', error);
        throw error;
    }
};

// 创建评论
export const createComment = async (commentData) => {
    try {
        const response = await api.post('/posts/create-comment', commentData);
        return response.data;
    } catch (error) {
        console.error('创建评论时出错：', error);
        throw error;
    }
};

// 删除评论
export const deleteComment = async (postId, commentId) => {
    try {
        const response = await api.post('/posts/delete-comment', {
            postId,
            commentId
        });
        return response.data;
    } catch (error) {
        console.error('删除评论时出错：', error);
        throw error;
    }
};