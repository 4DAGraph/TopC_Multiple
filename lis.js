var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://'+"localhost"+':8546'));
var x = web3.eth.gasPrice;
console.log(x)
