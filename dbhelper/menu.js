const Menu = require('../models/menu_schema');
const ApiError = require('../error/api_error');
const ApiErrorCode = require('../error/api_error_code');
exports.list = async (param) => {
  const { menuName, menuState } = param;
  const params = {};
  if (menuName) params.menuName = menuName;
  if (menuState) params.menuState = menuState;
  // 查询菜单列表
  const list = (await Menu.find(param)) || [];
  let treeList = [];
  _findMenuTree(list, null, treeList);
  if (treeList.length === 0 && list.length !== 0) {
    treeList = list;
  }
  return treeList;
};

exports.save = async (param) => {
  const { menuName } = param;
  if (!menuName) {
    throw new ApiError(ApiErrorCode.PARAM_ERROR);
  }
  const menu = new Menu(param);
  const res = await menu.save();
  if (!res) {
    throw new ApiError(ApiErrorCode.MENU_CREAT_ERROR);
  }
  return res;
};

exports.update = (param) => {
  const { menuName } = param;
  const { _id, ...params } = param;
  if (!menuName) {
    throw new ApiError(ApiErrorCode.PARAM_ERROR);
  }
  const res = Menu.findOneAndUpdate({ _id }, params);
  if (!res) {
    throw new ApiError(ApiErrorCode.MENU_UPDATE_ERROR);
  }
  return res;
};

exports.delete = async (param) => {
  const { menuIds } = param;
  const res = await Menu.findByIdAndRemove({ _id: menuIds });
  await Menu.deleteMany({ parentId: { $all: [menuIds] } });
  if (!res) {
    throw new ApiError(ApiErrorCode.MENU_DELETE_ERROR);
  }
  return res;
};

function _findMenuTree(list, id, item) {
  // 获取第一节点菜单列表
  list.forEach((l) => {
    if (String(l.parentId.slice().pop()) === String(id)) item.push(l._doc);
  });
  item.forEach((t) => {
    t.children = [];
    _findMenuTree(list, t._id, t.children);
    if (t.children.length === 0) {
      delete t.children;
      return;
    }
    if (t.children[0].menuType === 2) {
      t.action = t.children;
    }
  });
}
