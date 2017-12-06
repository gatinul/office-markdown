# Office-markdown

将excel/word文件的表格解析成markdown格式的文本，配套markdown实时预览编写功能。

### 使用注意

<!-- 在此次添加使用文档 -->

1. excel表格请不要手动添加空格
2. 请确保表头每列皆不为空

### 本地使用

```bash
$ npm i
$ npm run dev
$ open http://localhost:3001/
```

### TODO
1. ~~将tag识别标识都转为大写再比较~~
2. ~~增加复制按钮，复制到剪切板~~
3. excel，右侧markdown预览 增加保存 保存前将markdown文本marked转成html格式 这样每次点击时 只需获取文件中内容 appednd 即可 
4. word支持一键上传 逐个文件读取 记录日志 解析成html直接返回右侧div 也可保存
