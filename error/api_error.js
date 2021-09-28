const apiErrorMap = require('./api_error_map');
const apiErrorCode = require('./api_error_code');
class ApiError extends Error {
  constructor(code, message) {
    super();
    let errInfo = {};
    if (message) {
      errInfo = {
        code,
        message,
      };
    } else {
      errInfo = apiErrorMap.get(code) || apiErrorMap.get(apiErrorCode.UNKNOWN_ERROR);
    }
    this.name = errInfo.code;
    this.code = errInfo.code;
    this.message = errInfo.message;
  }
}
module.exports = ApiError;
