var bip39 = require("bip39")
var bip32 = require("bip32")
var bitcoin = require('bitcore-lib')
var HDKey = require('hdkey')
var bitcoinjs = require("bitcoinjs-lib")
var EthereumBip44 = require('ethereum-bip44');

var mnemonic = bip39.generateMnemonic()
console.log(mnemonic);
var seed = bip39.mnemonicToSeedHex(mnemonic)
console.log(seed)
var hdkey = HDKey.fromMasterSeed(new Buffer(seed, 'hex'))
console.log("HDkey",hdkey.privateExtendedKey)
var HDkey = hdkey.privateExtendedKey
var node = bip32.fromBase58(HDkey)
var child = node.derivePath("m/44'/0'/0'/0/0")
console.log(child.privateKey.toString('hex'))
console.log(child.toWIF())
bitcoinKey = child.toWIF()
var key = bitcoin.HDPrivateKey(HDkey);
//console.log(key)
var wallet = new EthereumBip44(key);
var ethereumKey = wallet.getPrivateKey(0).toString('hex')
var ethereumAddress = wallet.getAddress(0)
console.log(wallet.getPrivateKey(0).toString('hex'));

console.log(wallet.getAddress(0));

var keyPair = bitcoinjs.ECPair.fromWIF(bitcoinKey)
var bitcoinAddress = keyPair.getAddress()
console.log(address)

console.log({"version":"0.01","mnemonic":mnemonic,"HDkey":HDkey,"bitcoin":{"privateKey":bitcoinKey,"address":bitcoinAddress},"ethereum":{"privateKey":ethereumKey,"address":ethereumAddress}})

var keyPair = bitcoinjs.ECPair.fromWIF(bitcoinKey)
var address = keyPair.getAddress()
console.log(address)
