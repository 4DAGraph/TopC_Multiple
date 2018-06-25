//var litecore = require('litecore-lib')
var litecore = require('litecore');
var privateKey = new litecore.PrivateKey();
console.log(privateKey.toWIF())
var address = privateKey.toAddress();


