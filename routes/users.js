const router = require('koa-router')();
const controller = require('../controllers/user');
router.post('/login', controller.login);

module.exports = router;
