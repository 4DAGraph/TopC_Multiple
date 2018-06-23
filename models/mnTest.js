var litecore = require('litecore');
var privateKey = new litecore.PrivateKey();

var address = privateKey.toAddress().toString();
console.log(privateKey.toString())
console.log(address)
