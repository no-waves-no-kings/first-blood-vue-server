const mongoose = require('mongoose');
const config = require('../config');
const log4js = require('../utils/log4js');
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  config: {
    autoIndex: false,
  },
});

mongoose.connection.on('connected', () => {
  log4js.info(`Mongoose 连接成功:${config.database}`);
});

mongoose.connection.on('error', () => {
  log4js.error(`Mongoose 连接失败:${config.database}`);
});

mongoose.connection.on('disconnected', () => {
  log4js.error(`Mongoose 连接关闭:${config.database}`);
});

module.exports = mongoose;
