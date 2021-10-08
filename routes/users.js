const router = require('koa-router')();
const controller = require('../controllers/user');
router.post('/login', controller.login);
router.get('/', controller.listPage);
router.delete('/', controller.delete);
router.put('/', controller.update);
router.post('/', controller.save);

module.exports = router;
