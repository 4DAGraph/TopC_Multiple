var Web3 = require('web3');

var web3 = new Web3();
var nodeConnect = 'https://mainnet.infura.io/metamask';
web3.setProvider(new web3.providers.HttpProvider(nodeConnect));
var num = web3.eth.blockNumber;
 console.log(num)        
