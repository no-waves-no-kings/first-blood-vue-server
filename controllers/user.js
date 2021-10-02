const user = require('../dbhelper/user');
const ApiError = require('../error/api_error');
const ApiErrorCode = require('../error/api_error_code');

exports.login = async (ctx) => {
  const body = ctx.request.body;
  const res = await user.findOne(body);
  console.log(res);
  if (!res) {
    throw new ApiError(ApiErrorCode.USER_ACCOUNT_ERROR);
  }
  ctx.body = body;
};

exports.test = async (ctx) => {
  ctx.body = 123;
};
