const Koa = require('koa');
const app = new Koa();
const xlsx = require('node-xlsx').default;
const views = require('koa-views');
const fs = require('fs');
const staticDir = require('koa-static');
const path = require('path')
const router = require('./server/router');
const bodyParser = require("koa-bodyparser");
const koaBody = require('koa-body');
const shell = require('shelljs');
const log = require('./config').common;



// const files = `${__dirname}/doc/123.xlsx`;
// app.use(cors());

app.use(staticDir(
    path.join(__dirname, './static')
))
app.use(koaBody({ multipart: true }));

// 配置ctx.body解析中间件
app.use(bodyParser());

app.use(views('./view'));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3001);
console.log('[demo] start-quick is starting at port 3001');



// const fileDir = `${__dirname}/doc`;
// fs.readdir(fileDir, (err, files) => {
//     if (err) {
//         console.log(err);
//     } else {
//         files.forEach((fileName) => {
//             const files = path.join(fileDir, fileName)
//             parseFile()
//         })
//     }
// })
// function parseFile(fileName){

// }
// const data = xlsx.parse(fs.readFileSync(files));

// const content = [];
// for (let item of data) {
//     if (item.name == '请求报文') {
//         content.push(item)
//     } else {
//         console.log(`${item.name} 被过滤掉了`)
//     }
// }


shell.exec('mammoth ./static/test.docx --output-format=html', function (code, stdout, stderr) {
    if (code) {
        console.log('Error code: ' + code);
        // return;
    }
    log.debug(stdout)
});