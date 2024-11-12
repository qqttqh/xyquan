// api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: baseURL,
    timeout: 10000,
});
// const api = axios.create({
//     baseURL: 'http://localhost:3100',
//     timeout: 10000,
// });
// 请求拦截器
api.interceptors.request.use(
    config => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
