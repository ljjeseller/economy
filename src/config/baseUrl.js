const hostname = window.location.hostname;
// const port = window.location.port;

let BASE_URL = '';
if (hostname.indexOf('47') > -1) {
    // prod
    BASE_URL = 'http://47.91.227.34:7001';
} else if (hostname.indexOf('youemr') > -1) {
    // test
    BASE_URL = 'https://yapi.deepdmx.com/mock/8';
} else {
    // local
    BASE_URL = 'http://localhost:7001';
}

export  { BASE_URL };