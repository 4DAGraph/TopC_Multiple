module.exports = {
  port: process.argv[3]||3200,
  rpcPort:process.argv[4]||8546,
  nodeRpc:process.argv[5]||"http://127.0.0.1:"+(process.argv[4]||8546),
  cicport:'http://192.168.51.201:9000/',
//https://mainnet.infura.io/metamask
//https://mainnet.infura.io/
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
