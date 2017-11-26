'use strict'
const xlsx = require('node-xlsx').default;
const fs = require('fs');
const homeService = require('../service/homeService')


module.exports = {
  /**
   * 渲染首页
   * @param {obj} ctx 
   */
  async index(ctx) {
    await ctx.render('index')
  },
  async upload(ctx) {
    const file = ctx.request.body.files.file.path
    const result = await homeService.readFile(file)
    ctx.body = await result;
  }
}