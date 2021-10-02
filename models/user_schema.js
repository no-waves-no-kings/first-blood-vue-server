const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema(
  {
    userId: Number,
    userName: { type: String, unique: true, required: [true, '用户名必填'] },
    userPwd: String,
    userMobile: String,
    userEmail: { type: String, required: [true, '邮箱必填'] },
    state: {
      type: Number,
      default: 1,
    },
    sex: {
      type: Number,
      default: 0,
    },
    job: String,
    role: {
      type: Number,
      default: 1,
    },
    roleList: [],
    deptId: [],
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
);
userSchema.pre('findOneAndUpdate', function () {
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

mongoose.plugin(mongoosePaginate);
mongoose.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);
