const Router = require('koa-router');
const home = require('./controller/homeController');

const router = new Router();

router.get('/', home.index);
router.post('/upload', home.upload);
router.post('/download', home.download);


module.exports = router;