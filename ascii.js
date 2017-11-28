var Web3 = require('web3');
var web3 = new Web3();

var str = web3.toAscii("0000000000000000000000000000000000000000000000084bfa0896b09f0400");
console.log(str); // "ethereum"
