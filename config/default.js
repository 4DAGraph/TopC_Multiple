module.exports = {
  port: 3201,
  rpcPort:8545,
//  rpcPort:8546,
//  port:3200,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog',
  nodeip:"127.0.0.1"
};
