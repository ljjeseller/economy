import axios from '../config/axios'

/**
 *
 * views Login
 *
 * */

// getPatientLists
const getPatientLists = (params) => {
    // console.log(params);
    const url = `/getPatientLists`;
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
    getPatientLists,
};
