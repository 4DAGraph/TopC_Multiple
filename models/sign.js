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

module.exports = {
	signETH:  function cc_sign(req, res, next){
		console.log(date+":CC_signInformation");
		//console.log(req.params.rawtx);
        //if(req.body.token=="eth"||req.body.token==undefined){
		var tx = new Tx(JSON.parse(req.params.rawtx));

		var privateKey = new Buffer(req.params.privateKey, 'hex')

		tx.sign(privateKey);

		var serializedTx = tx.serialize();
		var result = '{"signText":"'+serializedTx.toString('hex')+'","tx":'+req.params.rawtx+'}';
		console.log(date+":CC_signInformation:success");
		res.send(result);
	//}
	},

        signUSDT: function signUSDT(req, res, next){
		console.log("")
                var priv = req.body.privatekey
                var tx = req.body.tx
                var unspend = req.body.unspend
		//console.log(priv)
                var keyPair = bitcoin.ECPair.fromWIF(priv)
		console.log("")
                var txb = new bitcoin.TransactionBuilder()
		//console.log(unspend);
                unspend.forEach(function(result){
                        txb.addInput(result.txid,result.value)
                })
		console.log("")
                var usdtvalue = toHex.toHex(tx[0].address);
                usdtvalue = toHex.paddingLeft(usdtvalue,16)
                var data = Buffer.from('6f6d6e69000000000000001f'+usdtvalue, 'hex')
                var dataScript = bitcoin.script.nullData.output.encode(data)
                txb.addOutput(dataScript, 0)
		console.log("")
                tx.forEach(function(result){
                        txb.addOutput(result.address,result.value)
                })
                txb.sign(0, keyPair)
                res.send(txb.build().toHex())
        },

        newSign:  function newSign(req, res, next){
	console.log(req.body.token);
	if(req.body.token=="eth"||req.body.token==undefined){	
                console.log(date+":HC_signInformationIn");
                //const gasPrice = web3.eth.gasPrice;

                const gasPriceHex = "0x"+toHex.toHex(req.params.gasPrice);

                const gasLimitHex = "0x"+parseInt(req.params.gasLimit).toString(16);

                const nonce = req.params.nonce;

                const nonceHex = "0x"+parseInt(nonce).toString(16);

                var rawTx = {

                    nonce: nonceHex,

                    gasLimit: gasLimitHex,

                    to: req.params.to,

                    value: parseInt(req.params.value),


                    gasPrice: gasPriceHex
                }
                console.log(date+":HC_signInformationIn-success");
                res.send(rawTx);
	}


	if(req.body.token != "eth"&& req.body.token!=undefined){
                console.log(date+":HC_signInformationIn");
                //const gasPrice = web3.eth.gasPrice;

                const gasPriceHex = "0x"+parseInt(req.params.gasPrice).toString(16);

                const gasLimitHex = "0x"+parseInt(req.params.gasLimit).toString(16);

                const nonce = req.params.nonce;

                const nonceHex = "0x"+parseInt(nonce).toString(16);

                var func = "0xa9059cbb000000000000000000000000"




                var to = req.params.to

                var amount = toHex.toHex(req.params.value)//parseInt(req.params.value).toString(16)
//console.log(req.params.value);
//console.log(amount);
//console.log(toHex.toHex(req.params.value))
                var input = func+to.substr(2)+paddingLeft(amount,64);

                var rawTx = {

                    nonce: nonceHex,

                    gasLimit: gasLimitHex,

                    to: address[req.body.token],

                    value: 0,

                    input: input,

                    gasPrice: gasPriceHex
                }
                console.log(date+":HC_signInformationIn-success");
                res.send(rawTx);
                function paddingLeft(str,lenght){
                        if(str.length >= lenght)
                        return str;
                        else
                        return paddingLeft("0" +str,lenght);
                }
	}
	}
}
