import ApiError from '../error/api_error';
import ApiErrorCode from '../error/api_error_code';
import ApiErrorMap from '../error/api_error_map';
import { success, error } from '../utils/utils';
const responseFormatter = (apiPrefix) => async (ctx, body) => {
  if (ctx.request.path.startsWith(apiPrefix)) {
    try {
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
