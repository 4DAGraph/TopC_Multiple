var Web3 = require('web3');
var web3 = new Web3();
var fs = require('fs');
var solc = require("solc");
const Wallet = require('ethereumjs-wallet');
var ethKeys = require("ethereumjs-keys");
var date = new Date();
var config = require('../config/default.js');
var crypto = require('crypto');

var nodeConnect = 'http://'+config.nodeip+':'+config.rpcPort;
web3.setProvider(new web3.providers.HttpProvider(nodeConnect));

var key1="";
var key2="";
var key3="";
var key4="";
var key5="";
var privateKey="";
var key = ["","","","","","","","","",""];
module.exports = {
	key1store: function (req, res, next){
		key1 = req.body.key;
		res.send("success");
	},
	key2store: function (req, res, next){
		key2 = req.body.key;
		res.send("success");
	},
	key3store: function (req, res, next){
		key3 = req.body.key;
		res.send("success");
	},
	key4store: function (req, res, next){
		key4 = req.body.key;
		res.send("success");
	},
	key5store: function (req, res, next){
		key5 = req.body.key;
		res.send("success");
	},
	keyResult: function (req, res, next){
		console.log(key1+key2+key3+key4+key5);
		res.send(privateKey);
	},
	keyCombine: function (req, res, next){
		var result = req.body.KeyResult;
		for (var i=0;i< result.length;i++){
			key[result[i].KeyNumber-1] = result[i].Key;
		}
		console.log(key)
		res.send("success");
	},
	keyDelete: function (req, res, next){
		for (var i=0;i< key.length;i++){
			key[i] = "";
		}
		res.send("success");
	},
	keyStore_publishV2: function (req, res, next){
		var sha256 = crypto.createHash("sha256");
		var sum ="";
		//console.log(key.length)
		for (var i=0;i< key.length;i++){
			sum =sum+ key[i];
		}
		//console.log(sum);
		sha256.update(sum);
		var pkey = sha256.digest("hex")
		priKey = pkey;
		console.log(priKey);
		//res.send("success");
		//簽章
		var Tx = require('ethereumjs-tx');
		//console.log(req.body);
		var tx = new Tx(req.body);
		//console.log(123)
		var privateKey = new Buffer(priKey, 'hex')
		tx.sign(privateKey);
		var serializedTx = tx.serialize();
		console.log(serializedTx.toString('hex'));
		res.send(serializedTx.toString('hex'));
	},
	keyStore_checkKey: function (req, res, next){
console.log(key)
		var sum ="";
		for (var i=0;i< key.length;i++){
			if(i==0){
				sum = sum+ "{"
			}
			if(key[i]!=""){
				sum =sum+'"'+(i+1)+'"'+":true\n";
			}
			if(key[i]==""){
				sum =sum+'"'+ (i+1)+'"'+":false\n";
			}
			if(i!=key.length-1){
				sum = sum+",";
			}
			if(i==key.length-1){
				sum = sum+"}";
			}
		}
		
		res.send(sum);
	},
	keyStore_publish: function (req, res, next){
		var sha256 = crypto.createHash("sha256");
		var sum = key1+key2+key3+key4+key5;
		sha256.update(sum);
		var pkey = sha256.digest("hex")
		privateKey = pkey;
		res.send("success");
	}
}


















