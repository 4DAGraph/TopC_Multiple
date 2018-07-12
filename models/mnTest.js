var litecore = require('litecore');
var ethereum = require('ethereumjs-wallet')
var bitcoin = require('bitcore-lib')

var privateKey = new litecore.PrivateKey();

//var bitcoinAddress = keyPair.getAddress()

var bitcoinprivateKey = new bitcoin.PrivateKey("A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3");
var bitcoinAddress = bitcoinprivateKey.toAddress().toString();
var bitcoinKey = bitcoinprivateKey.toString()

console.log(bitcoinAddress)

//litecoin
//var litecore = require('litecore');
var privateKey = new litecore.PrivateKey("A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3");
var litecoinAddress = privateKey.toAddress().toString();
var litecoinKey = privateKey.toString()
console.log(litecoinAddress)

var x = ethereum.fromPrivateKey(Buffer.from("A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3","hex"))
console.log(x.getAddress().toString("hex"))
