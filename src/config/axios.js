import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import router from '../router'
import { BASE_URL } from './baseUrl'

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 10 * 1000;

axios.interceptors.request.use((config) => {
    const { token } = store.state.user;
    if (token) {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error.message || '未知错误');
});


axios.interceptors.response.use((response) => {
    // Do something with response data
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, (error) => {
    // Do something with response error
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 返回 401 清除token信息并跳转到登录页面
                store.dispatch('changeLoginStatus', { isLogin: false, token: '', username: '' });
                router.replace({
                    path: '/Login',
                    query: { redirect: router.currentRoute.fullPath }
                });
                break;

            default:
                Vue.$message.error(error.response.data.msg || '未知错误');
        }
    } else {
        return Promise.reject(error.message || '未知错误');
    }

    

    
});

export default axios;
