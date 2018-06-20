var Web3 = require('web3');
var web3 = new Web3();
var fs = require('fs');
var solc = require("solc");
const Wallet = require('ethereumjs-wallet');
var ethKeys = require("ethereumjs-keys");
var date = new Date();
var config = require('../config/default.js');
var crypto = require('crypto');
var Tx = require('ethereumjs-tx');
var abi = require('./erc.json');
var request = require('request');
var nodeConnect = config.nodeRpc;
console.log(nodeConnect)
web3.setProvider(new web3.providers.HttpProvider(nodeConnect));
var address = require("./address.json")
var toHex = require('./bigIntToHex.js');
var bitcoin = require('../bitcoinjs')
  bitcoin.generateMnemonic(160, function (size) {
    t.equal(size, 160 / 8)
    return Buffer.allocUnsafe(size)
  })
/*
module.exports = {
        bitcoin:  function bitcoin(req, res, next){
		
	}	

}
*/
