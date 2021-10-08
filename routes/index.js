const router = require('koa-router')();

const { apiPrefix } = require('../config');
const users = require('./users');
const menus = require('./menus');
router.prefix(apiPrefix);
router.use('/users', users.routes(), users.allowedMethods());
router.use('/menus', menus.routes(), menus.allowedMethods());
module.exports = router;
