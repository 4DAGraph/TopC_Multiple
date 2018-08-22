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
//console.log(nodeConnect)
web3.setProvider(new web3.providers.HttpProvider(nodeConnect));
var address = require("./address.json")
var toHex = require('./bigIntToHex.js');
var bitcoin = require('../bitcoinjs')
var litecore = require('litecore-lib')
var bitcoincashjs = require("bitcoincashjs")

module.exports = {
	signETH:  function cc_sign(req, res, next){
		var tx = new Tx(JSON.parse(req.params.rawtx));
		var privateKey = new Buffer(req.params.privateKey, 'hex')

		tx.sign(privateKey);

		var serializedTx = tx.serialize();
		var result = '{"signText":"'+serializedTx.toString('hex')+'","tx":'+req.params.rawtx+'}';
		//console.log(date+":CC_signInformation:success");
		res.send(result);
	},
        signNewETH:  function signNewETH(req, res, next, rawtx){

                var tx = new Tx(rawtx);
                var privateKey = new Buffer(req.body.privateKey, 'hex')
                //var privateKey = new Buffer(req.params.privateKey, 'hex')
                tx.sign(privateKey);

                var serializedTx = tx.serialize();
                var result = '{"signText":"'+serializedTx.toString('hex')+'","tx":'+req.params.rawtx+'}';
                res.send(result);
        //}
        },
        signUSDT: function signUSDT(req, res, next){
		console.log("signusdt")
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
                var usdtvalue = toHex.toHex(tx[0].value);
                usdtvalue = toHex.paddingLeft(usdtvalue,16)
                var data = Buffer.from('6f6d6e69000000000000001f'+usdtvalue, 'hex')
                var dataScript = bitcoin.script.nullData.output.encode(data)
                txb.addOutput(dataScript, 0)
                txb.addOutput(tx[1].address,tx[1].value)
                //console.log(4)
                txb.addOutput(tx[0].address,546)
                txb.sign(0, keyPair)
                res.send('{"signText":"'+txb.build().toHex()+'"}')
        },

	signBTC: function signBTC(req, res, next){
                var priv = req.body.privatekey
                var tx = req.body.tx
                var unspend = req.body.unspend
	        var keyPair = bitcoin.ECPair.fromWIF(priv)
	        var txb = new bitcoin.TransactionBuilder()
			if(req.body.compressed != undefined)
				keyPair["compressed"] = req.body.compressed

			unspend.forEach(function(result){
	                txb.addInput(result.txid,result.value)
			//txb.addInput('b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c', 6)
                	console.log(result.txid)
                	//console.log(result.value)
	        })
		//txb.addInput('b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c', 6)
	        tx.forEach(function(result){
	                txb.addOutput(result.address,result.value)
			console.log(result)
	   	}) 
	        //txb.sign(0, keyPair) 
		var inputs_t = 0;
		unspend.forEach(function(result){
			//console.log()
			txb.sign(inputs_t, keyPair);
			inputs_t = inputs_t+1;
		})
		//console.log(txb.build())
		var re = '{"signText":"'+txb.build().toHex()+'"}'
		//console.log(123)
		res.send(re)
		//res.send('{"signText":"'+txb.build().toHex()+'"}')
	},

        signBTCrelay: function signBTCrelay(req, res, next){
                var priv = req.body.privatekey
                var tx = req.body.tx
                var unspend = req.body.unspend
                var keyPair = bitcoin.ECPair.fromWIF(priv)
                var txb = new bitcoin.TransactionBuilder()
				if(req.body.compressed != undefined)
					keyPair["compressed"] = req.body.compressed
				var cicAddress = req.body.cicAddress
                unspend.forEach(function(result){
                        txb.addInput(result.txid,result.value)
                })
                tx.forEach(function(result){
                        txb.addOutput(result.address,result.value)
                        //console.log(result)
                })
                var usdtvalue = toHex.toHex(10000);
                usdtvalue = toHex.paddingLeft(usdtvalue,16)

                var data = Buffer.from('c2cccccc0000000000000001'+cicAddress, 'hex')
                var dataScript = bitcoin.script.nullData.output.encode(data)
                txb.addOutput(dataScript, 0)

                var inputs_t = 0;
                unspend.forEach(function(result){
                        //console.log()
                        txb.sign(inputs_t, keyPair);
                        inputs_t = inputs_t+1;
                })
                
                var re = '{"signText":"'+txb.build().toHex()+'"}'
                
                res.send(re)
                
        },
        signLTC: function signLTC(req, res, next) {
                console.log(1)
                var privateKey = new litecore.PrivateKey(req.body.privatekey);
console.log(2)
                var publicKey = privateKey.toPublicKey();
                var address = privateKey.toAddress()
                var tx = req.body.tx
                var unspend = req.body.unspend
console.log(8)
               // let inputs_t = 0
               // let outouts_t = 0

                var utxo = []

                unspend.forEach(function (result) {
                        console.log(result)
                        utxo.push({
                                txId: result.txid,
                                outputIndex: result.value,
                                address: address,
                                script: new litecore.Script(address).toHex(),
                                satoshis: 20000
                        })
                })
                console.log(3)
                var transaction = new litecore.Transaction()
                transaction.from(utxo, publicKey)
                console.log(4)
                tx.forEach(function (result) {
                        console.log(result)
                        transaction.to(result.address, result.value)
                        console.log(6)
                })
                console.log(5)
                transaction.sign(privateKey);
                var re = '{"signText":"' + transaction + '"}'
                console.log(re)
                res.send(re)

        },
        signBCH: function signBCH(req, res, next) {
                console.log(1)
                var privateKey = new bitcoincashjs.PrivateKey(req.body.privatekey);

                var publicKey = privateKey.toPublicKey();
                var address = privateKey.toAddress()
                var tx = req.body.tx
                var unspend = req.body.unspend

                let inputs_t = 0
                let outouts_t = 0

                var utxo = []

                unspend.forEach(function (result) {
                        console.log(result)
                        utxo.push({
                                txId: result.txid,
                                outputIndex: result.value,
                                address: address,
                                script: new bitcoincashjs.Script(address).toHex(),
                                satoshis: 20000
                        })
                })
                console.log(3)
                var transaction = new bitcoincashjs.Transaction()
                transaction.from(utxo, publicKey)
                console.log(4)
                tx.forEach(function (result) {
                        console.log(result.value)
                        transaction.to(result.address, result.value)
                        console.log(6)
                })
                console.log(5)
                transaction.sign(privateKey);
                var re = '{"signText":"' + transaction + '"}'
                console.log(re)
                res.send(re)

        },

        newSignAll:  function newSignAll(req, res, next){
	var rawtx = JSON.parse(req.params.rawtx);
	if(req.body.to==undefined){
		req.params.gasPrice = rawtx.gasPrice
		req.params.gasLimit = rawtx.gasLimit
		req.params.nonce = rawtx.nonce
		req.params.to = rawtx.to
		console.log(req.params.to);
		req.params.value = rawtx.value
	}
        if((req.body.token=="eth"||req.body.token==undefined)&& req.body.contractAddress==undefined){
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
                return rawTx;
        }


        if(req.body.token!=undefined && req.body.contractAddress!=undefined){
		console.log(req.body.contractAddress)
                const gasPriceHex = "0x"+parseInt(req.params.gasPrice).toString(16);
                const gasLimitHex = "0x"+parseInt(req.params.gasLimit).toString(16);
                const nonce = req.params.nonce;
                const nonceHex = "0x"+parseInt(nonce).toString(16);
                var func = "0xa9059cbb000000000000000000000000"
                var to = req.params.to
                var amount = toHex.toHex(req.params.value.toString())//parseInt(req.params.value).toString(16)
                var input = func+to.substr(2)+paddingLeft(amount,64);
                var rawTx = {
                    nonce: nonceHex,
                    gasLimit: gasLimitHex,
                    to: req.body.contractAddress,
                    value: 0,
                    input: input,
                    gasPrice: gasPriceHex
                }
                return rawTx;
                function paddingLeft(str,lenght){
                        if(str.length >= lenght)
                        return str;
                        else
                        return paddingLeft("0" +str,lenght);
                }
        }
        },
	newSign:  function newSign(req, res, next){
	if(req.body.token=="eth"||req.body.token==undefined){	
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
                res.send(rawTx);
	}


	if(req.body.token != "eth"&& req.body.token!=undefined){

                const gasPriceHex = "0x"+parseInt(req.params.gasPrice).toString(16);

                const gasLimitHex = "0x"+parseInt(req.params.gasLimit).toString(16);

                const nonce = req.params.nonce;

                const nonceHex = "0x"+parseInt(nonce).toString(16);

                var func = "0xa9059cbb000000000000000000000000"




                var to = req.params.to

                var amount = toHex.toHex(req.params.value)//parseInt(req.params.value).toString(16)
                var input = func+to.substr(2)+paddingLeft(amount,64);

                var rawTx = {

                    nonce: nonceHex,

                    gasLimit: gasLimitHex,

                    to: address[req.body.token],

                    value: 0,

                    input: input,

                    gasPrice: gasPriceHex
                }
                function paddingLeft(str,lenght){
                        if(str.length >= lenght)
                        return str;
                        else
                        return paddingLeft("0" +str,lenght);
                }
	}
	},
        signCIC: function signCIC(req, res, next) {

                //function CICsign2(fee, address, outbtr, outcoin, nonce, type, input, PrivateKey) {
                
                //var aaaa = '{ "method": "signTransaction", "param": [{ "fee": "' + fee + '", "to": "' + address + '", "out": {"' + outbtr + '": "' + outcoin + '" }, "nonce": "' + nonce + '", "type": "' + type + '", "input": "' + input + '" }, "' + PrivateKey + '"] }'
                var aaaa = '{ "method": "signTransaction", "param": [{ "fee": "' + req.body.fee + '", "to": "' + req.body.address + '", "out": {"' + req.body.btr + '": "' + req.body.coin + '" }, "nonce": "' + req.body.nonce + '", "type": "' + req.body.type + '", "input": "' + req.body.input + '" }, "' + req.body.PrivateKey + '"] }'
                console.log(aaaa)
                aaaa = JSON.parse(aaaa)
		request.post(
                        //'http://192.168.51.201:9000/',
			CICport,
                        {
                                json: aaaa
                        },
                        function (error, response, body) {
                                //if (!error && response.statusCode == 200) {
				        console.log(body)
                                        //CICsend(body)
                        		request.post(
                                		CICport,
                                		{
                                        		json: { "method": "sendTransaction", "param": [body.result] }
                                		},
                                		function (error, response, body) {
                                        		if (!error && response.statusCode == 200) {
                                                		console.log(body)
                                                		res.send(body)
                                       			}
                               	 		}
                        		);	
                                //}
                        }
                );
	}
}
