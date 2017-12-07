'use strict'
const xlsx = require('node-xlsx').default;
const fs = require('fs');
const homeService = require('../service/homeService')
const log = require('../../config').common;
const logger = require('../../config').error;
const format = require('../util').format;
const sFormat = require('../util').symbolFormat;


module.exports = {
    /**
     * 渲染首页
     * @param {obj} ctx 
     */
    async index(ctx) {
        await ctx.render('index')
    },
    async upload(ctx) {
        log.info(format(`上传文件--${ctx.request.body.files.file.name}`, __filename))
        const result = {
            success: false,
            data: [],
            message: '',
            type: ''
        }
        const arr = ctx.request.body.files.file.name.split('.')
        const type = arr[arr.length - 1]
        log.info(sFormat(type))
        const file = ctx.request.body.files.file.path
        let content;
        if (type == 'xlsx') {
            content = await homeService.readXlsx(file)
            result.type = 'excel'
        } else if (type == 'docx') {
            content = await homeService.readDocx(file)
            result.type = 'doc'
        }
        if (content.success) {
            result.success = true
            result.data = content.data
        } else {
            result.message = content.message
        }
        ctx.body = result;
    },
    async download(ctx) {
        fs.writeFileSync('test.aj', ctx.request.body)
    }
}