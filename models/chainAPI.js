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

web3.setProvider(new web3.providers.HttpProvider('http://'+"localhost"+':8545'));

module.exports = {

	deploy_contract:  function deploy_contract(req, res, next){

		var nodeConnect = 'http://'+config.nodeip+':'+config.rpcPort;

		web3.setProvider(new web3.providers.HttpProvider(nodeConnect));

		var account = web3.eth.accounts[0];

		var password = req.params.password;

		web3.personal.unlockAccount(account,password,30000)

		var b = fs.readFileSync('contract.txt',"utf8");

		var input = {

		  	 'contract': b

		};

		var output = solc.compile({sources: input});

		for (var contractName in output.contracts){ 

			//console.log(contractName);

			var myContract = web3.eth.contract(JSON.parse(output.contracts[contractName].interface)); 

			var bytecode = '0x' + output.contracts[contractName].bytecode;

			var txDeploy = {from:account, data: bytecode, gas: 1000000}; 

			contractDeploy(txDeploy,myContract);

		}

		function contractDeploy(txDeploy,myContract){

			var greeter = myContract.new(txDeploy, function(e, contract){

				if(!e) {

					if(!contract.address) {

						//console.log("TransactionHash:" + contract.transactionHash + " waiting to be mined...");

					} else{

						//console.log("Contract mined! Address: " + contract.address);

						res.send({"contractAddress":contract.address});

					}

				}

			})

		}

	},

	sendTransaction:  function sendTransaction(req, res, next){

		var balance = req.params.balance;

		var nodeConnect = 'http://'+config.nodeip+':'+config.rpcPort;

		web3.setProvider(new web3.providers.HttpProvider(nodeConnect));

		var account = req.params.from;

		var to = req.params.to;

		var password = req.params.password;

		web3.personal.unlockAccount(account,password,30000)

		web3.eth.sendTransaction({from:account,value:1,to:to}, function(err, transactionHash) {

			if (!err)

			var txhash = transactionHash;

			var filter = web3.eth.filter('latest');

			console.log(date+":transactionHash-"+transactionHash);

			filter.watch(function(error, result) {

				var receipt = web3.eth.getTransactionReceipt(txhash);

				if (receipt && receipt.transactionHash == txhash) {

					console.log(date+":"+account+" transfer "+balance+" wei to "+account+" in "+txhash);

					filter.stopWatching();

				}

			});

		});	

	},

	receiveTransaction:  function receiveTransaction(req, res, next){

		var record = req.params.transaction;

		var nodeConnect = 'http://'+config.nodeip+':'+config.rpcPort;

		web3.setProvider(new web3.providers.HttpProvider(nodeConnect));

		var transactionRecord = web3.eth.getTransaction(record);

		var data = {

		from : transactionRecord.from,

		to : transactionRecord.to,

		value : transactionRecord.value,

		txHash : transactionRecord.hash

		}

		var receipt = web3.eth.getTransactionReceipt(data.txHash);

		if(typeof receipt!= null){

			console.log(data);

		}

	},

	transactionList_to:  function transactionList_to(req, res, next){

		var record = req.params.transaction;

		var nodeConnect = 'http://'+config.nodeip+':'+config.rpcPort;

		web3.setProvider(new web3.providers.HttpProvider(nodeConnect));

		var blockInitial = req.params.blockInitial;

		var blockFinal = req.params.blockFinal;

		var searchAddress = req.params.address;

		var data = []

		for(var x=blockInitial;x<=blockFinal;x++){

			var blockinfo = web3.eth.getBlock(x, true);

			console.log(blockinfo);

			blockinfo.transactions.forEach(function(element){

				//if(element.to != searchAddress){

					var output = { blockNumber: element.blockNumber, 

							from: element.from, 

							value: element.value,

							to: 	element.to			

							}

					

					data.push(output);

				//}

			});

			if(x == blockFinal){

				console.log(data);

				res.send(data);

			}

		}

	},

	transactionList_from:  function transactionList_from(req, res, next){

		var record = req.params.transaction;

		var nodeConnect = 'http://'+config.nodeip+':'+config.rpcPort;

		web3.setProvider(new web3.providers.HttpProvider(nodeConnect));

		var blockInitial = req.params.blockInitial;

		var blockFinal = req.params.blockFinal;

		var searchAddress = req.params.address;

		var data = []

		for(var x=blockInitial;x<=blockFinal;x++){

			var blockinfo = web3.eth.getBlock(x, true);

			blockinfo.transactions.forEach(function(element){

				if(element.from != searchAddress){

					var output = { blockNumber: element.blockNumber, 

							from: element.from, 

							value: element.value,

							to: 	element.to			

							}

					data.push(output);

				}

			});

			if(x == blockFinal){

				console.log(data);

			}

		}

	},

        transactionListRange:  function transactionListRange(req, res, next){
		console.log(123)
                var data = [];
                var initialBlock = req.params.initialBlock;
                var finalBlock = req.params.finalBlock;

                var a=0;
                        for(var leng=initialBlock;leng<=finalBlock;leng++){
                                console.log(leng)
                                var blockinfo = web3.eth.getBlock(leng, true);
                                console.log(123)
				a = a+blockinfo.transactions.length;
                                blockinfo.transactions.forEach(function(element){
                                        data.push(element);
                                        console.log(a);
                                        console.log(data.length)
					console.log(data);
					console.log(leng);
					console.log(finalBlock);/*
                                        if(leng == finalBlock&&data.length == a){
                                        res.send(data)
                                        }*/
                                });
                                if(leng == finalBlock&&data.length == a){
                                	res.send(data)
                                }
                        }
	},



	transactionList:  function transactionList(req, res, next){

		//var record = req.params.transaction;

		var nodeConnect = 'http://'+config.nodeip+':'+config.rpcPort;

		web3.setProvider(new web3.providers.HttpProvider(nodeConnect));

		var data = []

			var blockinfo = web3.eth.getBlock(req.params.blockNumber, true);

			blockinfo.transactions.forEach(function(element){
					/*

					var output = { blockNumber: element.blockNumber, 

							from: element.from, 

							value: element.value,

							to: 	element.to			

							}*/

					data.push(element);

			});

				console.log(data);

			res.send(data);



	},

	blockNumber:  function blockNumber(req, res, next){

		var nodeConnect = 'http://'+config.nodeip+':'+config.rpcPort;

		web3.setProvider(new web3.providers.HttpProvider(nodeConnect));

		res.send(web3.eth.blockNumber.toString());

	},
	transactionCount:  function transactionCount(req, res, next){

		var nodeConnect = 'http://'+config.nodeip+':'+config.rpcPort;

		web3.setProvider(new web3.providers.HttpProvider(nodeConnect));

		res.send(web3.eth.getTransactionCount(req.params.address).toString());

	},
	transactionReceipt:  function transactionReceipt(req, res, next){

		var nodeConnect = 'http://'+config.nodeip+':'+config.rpcPort;

		web3.setProvider(new web3.providers.HttpProvider(nodeConnect));

		res.send(web3.eth.getTransactionReceipt(req.params.address));

	},

	getBalance:  function getBalance(req, res, next){

		var nodeConnect = 'http://'+config.nodeip+':'+config.rpcPort;

		web3.setProvider(new web3.providers.HttpProvider(nodeConnect));

		res.send(web3.eth.getBalance(req.params.address));

	},

	call_constant:  function call_constant(req, res, next){

		var b = fs.readFileSync('contract.txt',"utf8");

		var contractAddress = "0xff31be57cd6caf395ad2e08220d38f30b7c6f6f7";

		var contractName = "contract:data";

		var functionName = "getData2";

		var input = {

			'contract': b

		};

		var output = solc.compile({sources: input});

		var myContract = web3.eth.contract(JSON.parse(output.contracts[contractName].interface)).at(contractAddress);

		console.log(myContract[functionName]());

		res.send(myContract[functionName]());

	},

	HC_signInformationIn:  function HC_signInformationIn(req, res, next){
		//const gasPrice = web3.eth.gasPrice;

		const gasPriceHex = web3.toHex(req.params.gasPrice);

		const gasLimitHex = web3.toHex(req.params.gasLimit);

		const nonce = req.params.nonce;

		const nonceHex = web3.toHex(nonce);

		var rawTx = {

		    nonce: nonceHex,

		    gasLimit: gasLimitHex,

		    to: req.params.to,

		    value: parseInt(req.params.value),


		    gasPrice: gasPriceHex
		}

		res.send(rawTx);
		
	},

	CC_signInformation:  function CC_signInformation(req, res, next){

		//console.log(req.params.rawtx);

		var tx = new Tx(JSON.parse(req.params.rawtx));

		var privateKey = new Buffer(req.params.privateKey, 'hex')

		tx.sign(privateKey);

		var serializedTx = tx.serialize();
		var result = '{"signText":"'+serializedTx.toString('hex')+'","tx":'+req.params.rawtx+'}';

		res.send(result);

	},

	HC_signInformationOut:  function HC_signInformationOut(req, res, next){

		//熱錢包將簽章送出交易

		web3.eth.sendRawTransaction("0x"+req.params.serializedTx.toString('hex'), function(err, hash) {

			if(err != null){

				console.log(err);

				res.send("error");

				return ;

			}

			if (!err){

				console.log(hash);res.send(hash); 

			}

		});

	},

	key_publish: function (req, res, next){

		key_generate(req.params.amounts);

		function key_generate( keyAmounts){

			var keyResult = [];

			var times = 0;

			function key_product(){

				var keyGenerate = ethKeys.create();

				var kdf = "pbkdf2";

				//var keyjson = ethKeys.dump(passWord, keyGenerate.privateKey, keyGenerate.salt, keyGenerate.iv, kdf);

				var privateKey = keyGenerate.privateKey.toString("hex");

				//var salt = keyGenerate.salt.toString("hex");

				//var iv = keyGenerate.iv.toString("hex");

				//var buffer = new Buffer(privateKey.toString("hex"),"hex");

				//var data = JSON.stringify(keyjson);

				//fs.writeFileSync("./wa/testKey",data,"utf8");

				const privateTransferPublic = Wallet.fromPrivateKey(keyGenerate.privateKey);

				var dataJson = {

						address:privateTransferPublic.getAddressString(),

						//publicKey:privateTransferPublic.getPublicKeyString(),

						privateKey:privateKey

						//salt:salt,

						//iv:iv

				};

				//keyResult.push(keyjson);

				keyResult.push(dataJson);

			}

			key_main();

			function key_main(){

				key_product();

				times++;

				if(times != keyAmounts){

				key_main();

				}

			}

		console.log(date+":"+req.params.amounts+" keys have been publish");

		res.send(keyResult);

		}

	},
	key_publish: function (req, res, next){

		key_generate(req.params.amounts);

		function key_generate( keyAmounts){

			var keyResult = [];

			var times = 0;

			function key_product(){

				var keyGenerate = ethKeys.create();

				var kdf = "pbkdf2";

				//var keyjson = ethKeys.dump(passWord, keyGenerate.privateKey, keyGenerate.salt, keyGenerate.iv, kdf);

				var privateKey = keyGenerate.privateKey.toString("hex");

				//var salt = keyGenerate.salt.toString("hex");

				//var iv = keyGenerate.iv.toString("hex");

				//var buffer = new Buffer(privateKey.toString("hex"),"hex");

				//var data = JSON.stringify(keyjson);

				//fs.writeFileSync("./wa/testKey",data,"utf8");

				const privateTransferPublic = Wallet.fromPrivateKey(keyGenerate.privateKey);

				var dataJson = {

						address:privateTransferPublic.getAddressString(),

						//publicKey:privateTransferPublic.getPublicKeyString(),

						privateKey:privateKey

						//salt:salt,

						//iv:iv

				};

				//keyResult.push(keyjson);

				keyResult.push(dataJson);

			}

			key_main();

			function key_main(){

				key_product();

				times++;

				if(times != keyAmounts){

				key_main();

				}

			}

		console.log(date+":"+req.params.amounts+" keys have been publish");

		res.send(keyResult);

		}

	},

	keyStore_publish: function (req, res, next){

		var sha256 = crypto.createHash("sha256");

		sha256.update("foo");

		console.log(sha256.digest("hex"));

		

	}

}




































