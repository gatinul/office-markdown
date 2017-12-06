/**
 * 返回格式化后的日志
 * @param  {string} 日志内容
 * @param  {string} 当前文件路径
 */
exports.format = function(str, file) {
    console.log(file);
    const a = file.split('/');
    const b = a[a.length - 1].split('.');
    const name = firstUpperCase(b[0]);
    return (`${name}：${str}`);
};
exports.symbolFormat = function(str) {
    const result = '****' + str + '****';
    return result;
};
/**
 * 首字母大写
 * @param  {string} str
 */
function firstUpperCase(str) {
    return str.replace(/^\S/, (s) => {
        return s.toUpperCase();
    });
}