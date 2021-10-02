const ApiError = require('../error/api_error');
const ApiErrorCode = require('../error/api_error');
const ApiErrorMap = require('../error/api_error_map');
const { success, error } = require('../utils/utils');
const responseFormatter = (apiPrefix) => async (ctx, next) => {
  if (ctx.request.path.startsWith(apiPrefix)) {
    try {
      console.log(ctx.request.path);
      await next();
      if (ctx.response.status === 404) {
        throw new ApiError(ApiErrorCode.NOT_FOUND_ERROR);
      } else {
        ctx.body = success(ctx.body);
      }
    } catch (e) {
      if (e instanceof ApiError) {
        ctx.body = error(e.message, e.code);
      } else {
        ctx.response.body = error(ApiErrorMap.get(ApiErrorCode.UNKNOWN_ERROR), ApiErrorCode.UNKNOWN_ERROR);
      }
    }
  } else {
    await next();
  }
};

module.exports = responseFormatter;
