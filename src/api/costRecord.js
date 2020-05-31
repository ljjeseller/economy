import axios from '../config/axios'


// findAllRecord
const findAllRecord = (params) => {
    // console.log(params);
    const url = `/api/v1/findAllRecord`;
    return new Promise((resolve, reject) => {
        axios.post(url, params).then((response) => {
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

// addRecord
const addRecord = (params) => {
    // console.log(params);
    const url = `/api/v1/addRecord`;
    return new Promise((resolve, reject) => {
        axios.post(url, params).then((response) => {
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

// addRecord
const deleteRecord = (params) => {
    // console.log(params);
    const url = `/api/v1/deleteRecord`;
    return new Promise((resolve, reject) => {
        axios.post(url, params).then((response) => {
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
    findAllRecord,
    addRecord,
    deleteRecord,
};
