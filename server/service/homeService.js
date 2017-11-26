'use strict'
const xlsx = require('node-xlsx').default;
const fs = require('fs');
const log = require('../../config').common;
const logger = require('../../config').error;

module.exports = {
  /**
   * 读取文件内容并返回
   * @param  {string} 文件路径
   */
  async readFile(file) {
    const data = xlsx.parse(fs.readFileSync(file));
    const result = {
      success: false,
      message:'',
      data:[]
    }
    if(data){
      result.success = true;
      fs.unlink(file,err => {
        if(err){
          logger.error(new Error('文件删除失败'));
        }else{
          log.info(`删除文件${file}成功`)
        }
      })
      result.data = data
    }else{
      result.message = '解析excel失败'
    }
    return result;
  }
}