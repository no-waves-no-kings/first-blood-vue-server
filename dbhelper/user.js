const model = require('../models/user_schema');
exports.findOne = (param) => {
  return model.findOne(param);
};
