const router = require('koa-router')();

const { apiPrefix } = require('../config');
const users = require('./users');
router.prefix(apiPrefix);
router.use('/users', users.routes(), users.allowedMethods());
module.exports = router;
