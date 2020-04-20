import axios from '../config/axios'

/**
 *
 * views Login
 *
 * */

// userLogin
const userLogin = (params) => {
    const url = `/api/v1/login`;
    return new Promise((resolve, reject) => {
        axios.post(url, { ...params }).then((response) => {
            const { code, msg, data } = response.data;
            if (code === 0) {
                resolve(data);
            } else {
                reject(msg);
            }
        }).catch((error) => {
            reject(error);
        })
    });
};

// getUserInfo
const getUserInfo = () => {
    // console.log(params);
    const url = `/getUserInfo`;
    return new Promise((resolve, reject) => {
        axios.get(url).then((response) => {
            const { code, msg, data } = response.data;
            if (code === 0) {
                resolve(data);
            } else {
                reject(msg);
            }
        }).catch((error) => {
            reject(error);
        })
    });
};


export default {
    userLogin,
    getUserInfo,
};
