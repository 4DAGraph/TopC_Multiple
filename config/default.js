module.exports = {
  port: 3200,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog',
  rpcPort:8545,
  nodeip:"127.0.0.1"
};
