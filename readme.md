# Office-markdown

将excel/word文件的表格解析成markdown格式的文本，配套markdown实时预览编写功能。

### 使用注意

<!-- 在此次添加使用文档 -->

1. 请确保表头每列皆不为空
2. 请将要区分格式的段落前增加关键词
3. 解析关键词配置在`static/public/js/config.js`里，区分按表格/文本/代码格式解析

### 本地使用

```bash
$ npm i
$ npm run parse
$ npm run dev
$ open http://localhost:3001/
```

### TODO
1. ~~将tag识别标识都转为大写再比较~~
2. ~~增加复制按钮，复制到剪切板~~
3. ~~excel，右侧markdown预览 增加保存 保存前将markdown文本marked转成html格式 这样每次点击时 只需获取文件中内容 appednd 即可~~ 
4. ~~word支持一键上传 逐个文件读取 记录日志 解析成html直接返回右侧div 也可保存~~
5. ~~excel一键生成~~
6. 将md格式文件下载下来
7. ~~加载中样式处理~~
8. ~~excel解析预览后返回~~
