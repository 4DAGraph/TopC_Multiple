var Web3 = require('web3');
var web3 = new Web3();
var fs = require('fs');
//var solc = require("solc");
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
        transactionList:  function transactionList(req, res, next){
console.log(123)
		//if(req.params.token == "eth"){
                var data = []
                        var blockinfo = web3.eth.getBlock(req.params.blockNumber, true);
                        console.log(blockinfo);
                        blockinfo.transactions.forEach(function(element){
                        element.token = "eth"
                        if (element.value == 0){
                                if(element.input.substr(0,10) != "0xa9059cbb"){
                                        if(element.input.substr(34,40)){
                                                //console.log(element.to)
                                                
                                                element.to = "0x"+element.input.substr(34,40);
                                                //element.value = parseInt(element.input.substr(74,64),16).toString();
                                                //if(element.logs[0].blockNumber){
                                                //element.value = parseInt(element.input.substr(74,64),16).toString();
                                                //}
                                                //console.log(element)
                                                //else{element.value="0"}
                                        }
                                }
                        }
                        for(var a in address){
                                if(element.to == address[a]){
                                         if(element.input.substr(0,10) == "0xa9059cbb"){
                                                element.token = a;
                                                 element.to = "0x"+element.input.substr(34,40);
                                                //if(element.logs[0].blockNumber>0){
                                                element.value = parseInt(element.input.substr(74,64),16).toString();
                                                //}
                                                //else{element.value="0"}
                                                 //console.log(element)
                                                 //data.push(element);

                                        }
                                }
                        }

                                        data.push(element);
                        });
                        console.log("transactionList"+req.params.blockNumber/*+data*/);
                        res.send(data);
		//}
        }
}
