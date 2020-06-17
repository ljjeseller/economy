import axios from '../config/axios'


// findAllTags
const findAllTags = (params, slide = false) => {
    // console.log(params);
    const url = `/api/v1/findAllTags`;
    return new Promise((resolve, reject) => {
        axios.post(url, params).then((response) => {
            const { code, msg, data } = response.data;
            if (code === 0) {
                const tags = data.result.rows;
                
                if (slide) {
                    resolve(tags);
                }

                const per = 8;
                const temp = [];
                tags.forEach((tag, index) => {  
                    if ( index % per === 0 ) {
                        temp.push({ items: []});
                        temp[temp.length - 1].items = tags.slice(index, index + per);
                    }
                });

                resolve(temp);
            } else {
                reject(msg);
            }
        }).catch((error) => {
            reject(error);
        })
    });
};


export default {
    findAllTags,
};
