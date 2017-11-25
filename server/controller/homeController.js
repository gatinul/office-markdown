'use strict'

module.exports = {
  /**
   * 渲染首页
   * @param {obj} ctx 
   */
  async index(ctx) {
    await ctx.render('index')
  }
}