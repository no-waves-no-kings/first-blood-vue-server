const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const menuSchema = new mongoose.Schema(
  {
    menuName: String,
    menuType: Number,
    parentId: {
      type: Array(mongoose.Types.ObjectId),
    },
    menuState: Number,
    component: String,
    icon: String,
    path: String,
    menuCode: String,
  },
  {
    timestamps: { createdAt: 'createdTime', updatedAt: 'updatedTime' },
  },
);
menuSchema.pre('findOneAndUpdate', function () {
  const update = this.getUpdate();
  if (update.__v != null) {
    delete update.__v;
  }
  const keys = ['$set', '$setOnInsert'];
  for (const key of keys) {
    if (update[key] != null && update[key].__v != null) {
      delete update[key].__v;
      if (Object.keys(update[key]).length === 0) {
        delete update[key];
      }
    }
  }
  update.$inc = update.$inc || {};
  update.$inc.__v = 1;
});
menuSchema.plugin(mongoosePaginate);
menuSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Menu', menuSchema);
