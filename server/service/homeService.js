'use strict'
const xlsx = require('node-xlsx').default;
const fs = require('fs');
const log4js = require('../../config').log
const logger = log4js.getLogger('common');
const log = log4js.getLogger('error');

module.exports = {
  async readFile(file) {
    const data = xlsx.parse(fs.readFileSync(file));
    const result = {
      success:[],
      fail:[],
      message:''
    }
    if(data){
      fs.unlink(file,err => {
        if(err){
          log.error(new Error('文件删除失败'));
        }else{
          logger.info(`删除文件${file}成功`)
        }
      })
      for (let item of data) {
          if (item.name == '附录') {
              result.success.push(item)
          } else {
              result.fail.push(`${item.name} 被过滤掉了`)
          }
      }
    }else{
      result.message = '解析excel失败'
    }
    return result;
  }
}