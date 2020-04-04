import axios from '../config/axios'

/**
 *
 * views Login
 *
 * */

// getPrintInfo
const getPrintInfo = (params) => {
    // console.log(params);
    const url = `/getPrintInfo`;
    return new Promise((resolve, reject) => {
        axios.post(url, { params }).then((response) => {
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

// getPrintInfoMuti
const getPrintInfoMuti = (params) => {
    const url = `/getPrintInfoMuti`;
    return new Promise((resolve, reject) => {
        axios.post(url, { params }).then((response) => {
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
    getPrintInfo,
    getPrintInfoMuti,
};
