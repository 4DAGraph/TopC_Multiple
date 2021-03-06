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
//var nodeConnect = 'https://mainnet.infura.io/metamask';
//var nodeConnect = 'http://'+config.nodeip+':'+config.rpcPort;
var nodeConnect = config.nodeRpc;
web3.setProvider(new web3.providers.HttpProvider(nodeConnect));
var address = require("./address.json")
var CICport = config.cicport;
var GUCport = config.gucport;
var CFPport = config.cfpport;
var BNNport = config.bnnport;

module.exports = {
        getBalance:  function getBalance(req, res, next){
		//console.log(req.query.token);
		if(req.query.token=="eth"||req.query.token==undefined){		
                console.log(date+":getBalance");
                console.log(date+":getBalance-success");
                res.send(web3.eth.getBalance(req.params.address));
		}
		if(req.query.token!="eth"&&req.query.token!=undefined){
                console.log(date+":ETHToken");
                var CoursetroContract = web3.eth.contract(abi["abi"]);
                var Coursetro = CoursetroContract.at(address[req.query.token]);

                Coursetro.balanceOf(req.params.address,function(error, result) {
                if (!error) {
                        //console.log(result)
                        console.log(date+":getETHTokenBalance-success");
                        res.send(result);
                } else
                        console.log(error);
                });
        	}
	},
    getBalance_app:  function getBalance(req, res, next){
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");        
		//console.log(req.query.token);
		if((req.query.token=="ETH"||req.query.token==undefined)&&req.query.contractAddress==undefined){
            console.log(date+":getETHBalance");
            console.log(date+":getETHBalance-success");
            res.send({"balance":web3.eth.getBalance(req.params.address),"code":0,"message":"json"});
        }

        else if(req.query.token=="ETH"&&req.query.token!=undefined&&req.query.token!="BTC"&&req.query.contractAddress!=undefined){
            console.log(date+":ETHToken");
            var CoursetroContract = web3.eth.contract(abi["abi"]);
            var Coursetro = CoursetroContract.at(req.query.contractAddress);
            Coursetro.balanceOf(req.params.address,function(error, result) {
             	if (!error) {
              		//console.log(result)
               		console.log(date+":getETHTokenBalance-success");
              		res.send({"balance":result,"code":0,"message":"json"});
               	} else
                  	console.log(error);
            });
        }

//console.log(req.query.token)		
		else if(req.query.token=="BTC"&&req.query.token!=undefined){
			console.log(date+":getBTCBalance-start");
			request.get('https://blockexplorer.com/api/addr/'+req.params.address,function(error, response, body){		
				//console.log(body)
				body = JSON.parse(body);
				body["code"] = 0
				body["balance"] = body["balanceSat"]
				
				//console.log(JSON.parse(body)["balance"])
				body["message"] = "json"
				console.log(date+":getBTCBalance-success"+" source IP:"+req.ip);	
        		res.end(JSON.stringify(body));	
			});

            request.get('https://blockchain.info/q/addressbalance/'+req.params.address+'?confirmations=0',function(error, response, body){ 
                console.log(date+":getBTCBalance-success"+" source IP:"+req.ip);
                res.end(JSON.stringify({"balance":body,"code":0,"message":"json"}));
            });						
		}

        else if(req.query.token=="CIC"&&req.query.token!=undefined){
            console.log(date+":getCICBalance-start");
            request.get(
                CICport+"getAccount/"+req.params.address,
            //CICport+"getAccount/"+req.params.address,
                function (error, response, body) {
                    console.log(date+":getCICBalance-success"+" source IP:"+req.ip)
                    res.send(JSON.parse(body).result)
                }
            );
        }

        else if(req.query.token=="GUC"&&req.query.token!=undefined){
            console.log(date+":getGUCBalance-start");
            request.get(
                GUCport+"getAccount/"+req.params.address,
            //CICport+"getAccount/"+req.params.address,
                function (error, response, body) {
                    console.log(date+":getGUCBalance-success"+" source IP:"+req.ip)
                    res.send(JSON.parse(body).result)
                }
            );
        }

        else if(req.query.token=="CFP"&&req.query.token!=undefined){
            console.log(date+":getCFPBalance-start");
            request.get(
                CFPport+"getAccount/"+req.params.address,
            //CICport+"getAccount/"+req.params.address,
                function (error, response, body) {
                    console.log(date+":getCFPBalance-success"+" source IP:"+req.ip)
					//body = JSON.parse(body)
					//body.result.balance["cnkwh"]=body.result.balance["cnk"]
					//res.send(body.result)
					res.send(JSON.parse(body).result)
                }
            );
        }

        else if(req.query.token=="BNN"&&req.query.token!=undefined){
            console.log(date+":getBNNBalance-start");
            request.get(
                BNNport+"getAccount/"+req.params.address,
            //CICport+"getAccount/"+req.params.address,
                function (error, response, body) {
                    console.log(date+":getBNNBalance-success"+" source IP:"+req.ip)
                    res.send(JSON.parse(body).result)
                }
            );
        }

		else{
			console.log(date+":token error!")
			res.send(date+":token error!")
		}
    },
}
