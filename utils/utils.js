/**
 * 通用的工具函数
 * @type {{info?, debug?, error?}}
 */
const log4js = require('./log4js');
const CODE = {
  SUCCESS: 200,
  PARAM_ERROR: 10001,
  USER_ACCOUNT_ERROR: 20001,
  USER_LOGIN_ERROR: 3001,
  BUSINESS_ERROR: 90001,
  AUTH_ERROR: 40001,
};
module.exports = {
  pager({ pageNum = 1, pageSize = 10 }) {
    pageNum *= 1;
    pageSize *= 1;
    const skipIndex = (pageNum - 1) * pageSize;
    return {
      page: { pageNum, pageSize },
      skipIndex,
    };
  },
  success(data = '', msg = '', code = CODE.SUCCESS) {
    log4js.debug(data);
    return {
      code,
      data,
      msg,
    };
  },
  error(msg = '', code = CODE.BUSINESS_ERROR, data = '') {
    log4js.error(msg);
    return {
      code,
      msg,
      data,
    };
  },
};
