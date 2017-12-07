'use strict'
const xlsx = require('node-xlsx').default;
const fs = require('fs');
const log = require('../../config').common;
const logger = require('../../config').error;
const shell = require('shelljs');
const sFormat = require('../util').symbolFormat;
var mammoth = require("mammoth");

module.exports = {
    /**
     * 读取excel文件内容并返回
     * @param  {string} 文件路径
     */
    async readXlsx(file) {
        const data = xlsx.parse(fs.readFileSync(file));
        const result = {
            success: false,
            message: '',
            data: []
        }
        if (data) {
            result.success = true;
            fs.unlink(file, err => {
                if (err) {
                    logger.error(new Error('文件删除失败'));
                } else {
                    log.info(`删除文件${file}成功`)
                }
            })
            result.data = data
        } else {
            result.message = '解析excel失败'
        }
        return result;
    },
    async readDocx(file) {
        const result = {
            success: false,
            message: '',
            data: []
        }
        let data = await new Promise(function(resolve, reject) {
            // shell.exec(`mammoth ${file} --output-format=html`, function(code, stdout) {
            //     resolve(stdout)
            // });
            mammoth.convertToHtml({ path: file })
                .then(function(result) {
                    resolve(result.value)
                })
                .done();
        })
        if (data) {
            result.success = true;
            fs.unlink(file, err => {
                if (err) {
                    logger.error(new Error('文件删除失败'));
                } else {
                    log.info(`删除文件${file}成功`)
                }
            })
            result.data = data
        } else {
            result.message = '解析docx失败'
        }
        return result;
    }
}