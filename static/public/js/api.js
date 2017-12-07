import axios from 'axios';

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export default {
    /**
     * 上传文件
     * @param {object} param 
     */
    upload(param) {
        return fetch('/upload', param);
    },
    download(param) {
        return fetch('/download', param);
    }
};