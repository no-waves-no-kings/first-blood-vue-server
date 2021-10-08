const user = require('../dbhelper/user');

exports.login = async (ctx) => {
  const body = ctx.request.body;
  ctx.body = await user.findOne(body);
};

exports.listPage = async (ctx) => {
  const param = ctx.request.query;
  ctx.body = await user.findList(param);
};

exports.delete = async (ctx) => {
  const param = ctx.request.body;
  ctx.body = await user.delete(param);
};

exports.update = async (ctx) => {
  const param = ctx.request.body;
  ctx.body = await user.update(param);
};

exports.save = async (ctx) => {
  const param = ctx.request.body;
  ctx.body = await user.save(param);
};
