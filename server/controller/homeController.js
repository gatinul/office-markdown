'use strict'
const xlsx = require('node-xlsx').default;
const fs = require('fs');
const homeService = require('../service/homeService')
const log = require('../../config').common;
const logger = require('../../config').error;
const format = require('../util').format


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
      message: ''
    }
    const file = ctx.request.body.files.file.path
    const content = await homeService.readFile(file)
    if(content.success) {
      result.success = true
      result.data = content.data
    } else {
      result.message = content.message
    }
    ctx.body = result;
  }
}