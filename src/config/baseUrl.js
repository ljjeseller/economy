const hostname = window.location.hostname;
// const port = window.location.port;

let BASE_URL = '';
if (hostname.indexOf('aaa') > -1) {
    // prod
    BASE_URL = 'http://172.19.100.76:8181';
} else if (hostname.indexOf('youemr') > -1) {
    // test
    BASE_URL = 'https://yapi.deepdmx.com/mock/8';
} else {
    // local
    BASE_URL = 'http://localhost:7001';
}

export  { BASE_URL };