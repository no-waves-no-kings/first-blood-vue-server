const router = require('koa-router')();
const controller = require('../controllers/menu');
router.get('/', controller.list);
router.post('/', controller.save);
router.put('/', controller.update);
router.delete('/', controller.delete);
module.exports = router;
