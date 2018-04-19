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

module.exports = {
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