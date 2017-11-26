'use strict'
const xlsx = require('node-xlsx').default;
const fs = require('fs');

module.exports = {
  async readFile(file) {
    const data = xlsx.parse(fs.readFileSync(file));
    const result = {
      success:[],
      fail:[],
      message:''
    }
    if(data){
      console.log('service:success')
      fs.unlink(file,err => {
        if(err){
          console.log('删除失败')
        }else{
          console.log(`删除文件${file}成功`)
        }
      })
      for (let item of data) {
          if (item.name == '请求报文') {
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