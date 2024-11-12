import api from './api';

// 更新用户信息
export const updateUser = async (userData) => {
    try {
        const response = await api.post('/users/update', userData);
        return response.data;
    } catch (error) {
        console.error('更新用户时出错：', error);
        throw error;
    }
};
