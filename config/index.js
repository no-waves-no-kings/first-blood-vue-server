const env = process.env.NODE_ENV || 'prod';
console.log(env);
const envConfig = {
  dev: {
    port: 3000,
    database: 'mongodb://root:123456@122.51.167.40:27017/?authSource=admin',
  },
  test: {
    port: 3000,
    database: 'mongodb://root:123456@122.51.167.40:27017/first-blood-vue',
  },
  prod: {
    port: 3000,
    database: 'mongodb://root:123456@122.51.167.40:27017/first-blood-vue?authSource=datebase&authMechanism=SCRAM-SHA-1',
  },
};
console.log(envConfig[env]);
module.exports = {
  apiPrefix: '/api',
  ...envConfig[env],
};
