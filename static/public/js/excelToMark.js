$(document).ready(function() {
    var blockXs = '\n\n\n';
    var blockMd = '\n\n\n\n\n\n\n';
    $('.markdown-textarea').text(
        '## 接口名称' + blockXs +
        '## 接口描述' + blockXs +
        '## 请求报文' + blockMd +
        '## 返回报文' + blockMd
    );
});