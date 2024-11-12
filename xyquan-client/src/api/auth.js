// auth.js
import api from './api';
import { useUserStore } from '@/stores/user';
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus';

const userStore = useUserStore();

// 注册
export const register = (email, password) => {
    return api.post('/auth/register', { email, password })
        .then((response) => {
            const { token, user } = response.data;
            ElMessage({
                message: '注册成功',
                type: 'success'
            });
            // 更新 Pinia 状态
            const { userData } = userStore;
            Object.assign(userData, {
                token,
                userId: user.userId,
                userEmail: user.userEmail,
                userName: user.userName,
                userAvatar: user.userAvatar,
                userTag: user.userTag
            });
            // 存储 token 到 cookies
            Cookies.set('token', token, { expires: 180 });
            return response;
        })
        .catch((error) => {
            // 捕获错误并显示错误消息
            const errorMessage = error.response?.status === 400
                ? '账户已存在'
                : error.response?.data?.message || '注册时发生错误';

            ElMessage({
                message: errorMessage,
                type: 'error'
            });
            console.error('注册用户时出错：', error);
            throw error;
        });
};


// 登录
export const login = (email, password) => {
    return api.post('/auth/login', { email, password })
        .then((response) => {
            const { token, user } = response.data;
            // 判断状态并显示消息提示
            if (response.status === 200) {
                ElMessage({
                    message: '登录成功',
                    type: 'success'
                });
                // 更新 Pinia 状态
                const { userData } = userStore;
                Object.assign(userData, {
                    token,
                    userId: user.userId,
                    userEmail: user.userEmail,
                    userName: user.userName,
                    userAvatar: user.userAvatar,
                    userTag: user.userTag
                });
                // 存储 token 到 cookies
                Cookies.set('token', token, { expires: 180 });
            } else if (response.status === 401) {
                ElMessage({
                    message: '账号或密码错误',
                    type: 'error'
                });
            }

            return response;
        })
        .catch((error) => {
            // 捕获错误并显示错误消息
            ElMessage({
                message: error.response?.data?.message || '登录时发生错误',
                type: 'error'
            });
            console.error('登录时出错：', error);
            throw error; // 可以选择将错误继续抛出，供调用方处理
        });
};


// 登出
export const logout = () => {
    Cookies.remove('token')
    userStore.userData.token = ''
    userStore.userData.userId = null
    userStore.userData.userEmail = ''
    userStore.userData.userName = ''
    userStore.userData.userAvatar = ''
    userStore.userData.userTag = []
    userStore.userPosts = []
};


