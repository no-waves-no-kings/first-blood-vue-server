const model = require('../models/user_schema');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const ApiError = require('../error/api_error');
const ApiErrorCode = require('../error/api_error_code');
const util = require('../utils/utils');
const counter = require('../dbhelper/counter');
// const md5 = require('md5');
const crypto = require('crypto');
exports.findOne = async (param) => {
  console.log(param);
  const res = await model.findOne(param, '-userPwd');
  if (!res) {
    throw new ApiError(ApiErrorCode.USER_ACCOUNT_ERROR);
  }
  const data = res._doc;
  // 生成token
  const token = jwt.sign(data, secret, { expiresIn: 864000 });
  return { ...data, token };
};

exports.findList = async (param) => {
  // 获取查询条件
  const { userId, userName, state } = param;
  // 获取分页参数
  const { page, skipIndex } = util.pager(param);
  // 组装查询条件
  const query = {};
  if (userId) query.userId = userId;
  if (userName) query.userName = userName;
  if (state && state !== 0) query.state = state;
  // 查询
  const users = model.find(query);
  // 进行分页
  const list = await users.skip(skipIndex).limit(page.pageSize);
  page.total = await model.countDocuments(query);
  return { page, list };
};

exports.delete = async (param) => {
  const { userIds } = param;
  // 将用户状态改为离职
  const res = await model.updateMany({ userId: { $in: userIds } }, { state: 2 });
  if (!res.modifiedCount) {
    throw new ApiError(ApiErrorCode.USER_DELETE_ERROR);
  }
  return res;
};

exports.update = async (param) => {
  // 判断参数是否为空
  const { userId, userMobile, state, sex, job, roleList, deptId } = param;
  if (!deptId) {
    throw new ApiError(ApiErrorCode.PARAM_ERROR);
  }
  const res = await model.findOneAndUpdate(
    { userId },
    { userMobile, state, sex, job, roleList, deptId },
    { userPwd: 0 },
  );
  console.log(res);
  if (!res) {
    throw new ApiError(ApiErrorCode.USER_EDIT_ERROR);
  }
  return res;
};

exports.save = async (param) => {
  const { userName, userEmail, userMobile, job, state, roleList, deptId, sex } = param;
  if (!userName || !userEmail || !userMobile || !deptId) {
    throw new ApiError(ApiErrorCode.PARAM_ERROR);
  }
  // 查询用户是否已经注册过
  const user = await model.findOne({ userName, userEmail, userMobile }, 'userName userEmail userMobile');
  if (user) {
    throw new ApiError(ApiErrorCode.USER_ALREADY_EXIST_ERROR, `${userName}-${userEmail}已经注册`);
  }
  // 获取userId
  const userId = await counter.getSequenceById('userId');
  const userModel = new model({
    userId,
    userName,
    userEmail,
    userMobile,
    userPwd: crypto.createHash('md5').update('123456').digest('hex'),
    state,
    role: 1,
    job,
    roleList,
    deptId,
    sex,
  });
  const res = await userModel.save();
  if (!res) {
    throw new ApiError(ApiErrorCode.USER_CREAT_ERROR);
  }
  return res;
};
