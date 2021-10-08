const menu = require('../dbhelper/menu');
exports.list = async (ctx) => {
  const param = ctx.request.query;
  ctx.body = await menu.list(param);
};

exports.save = async (ctx) => {
  const param = ctx.request.body;
  ctx.body = await menu.save(param);
};

exports.update = async (ctx) => {
  const param = ctx.request.body;
  ctx.body = await menu.update(param);
};

exports.delete = async (ctx) => {
  const param = ctx.request.body;
  ctx.body = await menu.delete(param);
};
