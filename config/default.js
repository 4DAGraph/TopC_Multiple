module.exports = {
  port: process.argv[3]||3200,
  rpcPort:process.argv[4]||8546,
//  rpcPort:8546,
//  port:3200,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog',
  nodeip:"192.168.0.112"
};
