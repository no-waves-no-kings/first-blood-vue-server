import apiErrorCode from './api_error_code';
const ApiErrorMap = new Map();
ApiErrorMap.set(apiErrorCode.NOT_FOUND_ERROR, { code: apiErrorCode.NOT_FOUND_ERROR, message: '未找到该接口' });
ApiErrorMap.set(apiErrorCode.USER_ACCOUNT_ERROR, {
  code: apiErrorCode.USER_ACCOUNT_ERROR,
  message: '用户名或密码错误',
});
ApiErrorMap.set(apiErrorCode.PARAM_ERROR, { code: apiErrorCode.PARAM_ERROR, message: '参数确实错误' });
ApiErrorMap.set(apiErrorCode.NO_AUTH_ERROR, { code: apiErrorCode.NO_AUTH_ERROR, message: '没有操作权限' });
ApiErrorMap.set(apiErrorCode.UNKNOWN_ERROR, { code: apiErrorCode.UNKNOWN_ERROR, message: '未知错误' });

module.exports = ApiErrorMap;
