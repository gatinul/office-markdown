const Koa = require('koa');
const app = new Koa();
const xlsx = require('node-xlsx').default;
const views = require('koa-views');
const fs = require('fs');
const static = require('koa-static');
const path = require('path')


const files = `${__dirname}/doc/123.xlsx`;
const Router = require('koa-router');

const router = new Router();

app.use(static(
    path.join(__dirname, './build')
))

app.use(views('./view'));


router.get('/', async function(ctx) {
    // ctx.router available
    await ctx.render('index');
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
console.log('[demo] start-quick is starting at port 3000');



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