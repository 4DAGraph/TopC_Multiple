module.exports = {
  port: process.argv[3]||3200,
  rpcPort:process.argv[4]||8546,
  nodeRpc:process.argv[5]||"https://mainnet.infura.io/",//"http://127.0.0.1:"+(process.argv[4]||8546),
  cicport:'http://192.168.51.201:9000/',
  gucport:'http://52.89.199.20:9000/',
  cfpport: 'http://192.168.51.201:9001/',
  bnnport:'http://192.168.51.201:9002/',
  //gucport:'http://192.168.51.203:9000/',

	//https://mainnet.infura.io/metamask
//https://mainnet.infura.io/
//  rpcPort:8546,
//  port:3200,
  session: {
  },
  mongodb: 'mongodb://localhost:27017/myblog',
  nodeip:"127.0.0.1"
};
