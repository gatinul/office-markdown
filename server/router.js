const Router = require('koa-router');
const home = require('./controller/homeController')

const router = new Router();

router.get('/', home.index)

module.exports = router;