var Web3 = require('web3');
var web3 = new Web3();
var fs = require('fs');
const Wallet = require('ethereumjs-wallet');
var ethKeys = require("ethereumjs-keys");
var date = new Date();
var config = require('../config/default.js');
var crypto = require('crypto');
var Tx = require('ethereumjs-tx');
var abi = require('./erc.json');
var request = require('request');
var nodeConnect = config.nodeRpc;
web3.setProvider(new web3.providers.HttpProvider(nodeConnect));
var address = require("./address.json")
var toHex = require('./bigIntToHex.js');
var incomeBalance = require("./incomeBalance.js");
var sign = require("./sign.js")
var balance = require("./balance.js")
var broadcast = require("./broadcast.js")
var mod_getpass = require('getpass');
var globalKey = ""
var Transaction = require('ethereumjs-tx')
mod_getpass.getPass(
	function(error,result){
		globalKey = result
		console.log(globalKey)
	})

/*
function toHex(str) {
	var string = str;
	var buffer = new Buffer(string);
	var toHex = buffer.toString('hex');
	console.log(toHex)

	return toHex;
}
*/
module.exports = {
        txDecode: function txDecode(req, res, next){

		var txDecoder = require('ethereum-tx-decoder');
		var decodedTx = txDecoder.decodeTx("0x"+req.params.tx);
                res.send(decodedTx)
	},
	ETHtxDecode: function ETHtxDecode(req, res, next){
		var tx = new Transaction(req.params.tx);
		var ETHAddress = { "EthereumAddress:":tx.getSenderAddress().toString('hex')}
		console.log('Senders Address: ' + tx.getSenderAddress().toString('hex'))
		res.send(ETHAddress)
	},
	btcunspend: function btcunspend(req, res, next){
		broadcast.btcunspend(req, res, next);
	},
	newSignAll: function newSignAll(req, res, next){
		console.log(req.body.aes)
		console.log(globalKey)
		if(req.body.aes!=undefined){
			/*
			var iv = new Buffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00,0x00,0x00,0x00, 0x00, 0x00, 0x00, 0x00, 0x00,0x00,0x00]);
			var decipher = crypto.createDecipheriv('aes-256-cbc', globalKey, iv);
			var decoded = decipher.update(req.body.privateKey, 'hex', 'utf8');
			decoded += decipher.final('utf8');
			req.body.privateKey = decoded
			*/
    			var md5 = crypto.createHash("md5");
			md5.update(globalKey);
    			var key = md5.digest('hex');
    			var iv = key.substr(0, 16);
    			var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    			var restr = decipher.update(req.body.privateKey, 'base64', 'binary');
			restr += decipher.final('binary');
			req.body.privateKey= restr;
		}//mike.tsai

		//if(req.body.aes!=undefined){
		//	var aesresult = decrypt(req.body.privateKey,passphass)
		//	req.body.privateKey = aesresult
		//}
		for(var add in address) {
			//console.log("top:"+req.body.token)
			//console.log(add)		
			if(req.body.token == add||req.body.token=="eth"){
				//console.log("test1:"+req.params.rawtx)
                        	//console.log("test2:"+req.body.rawtx)
                        	var tx = sign.newSignAll(req, res, next);
                        	sign.signNewETH(req, res, next,tx);
			}
			
		}
/*
		if(req.body.token=="eth"||req.body.token==undefined||req.body.token=="omg"){
			console.log("test1:"+req.params.rawtx)
			console.log("test2:"+req.body.rawtx)
			var tx = sign.newSignAll(req, res, next);
                        sign.signNewETH(req, res, next,tx);
                }
*/
                if(req.body.token=="byb"){
                    var tx = sign.newSignAll(req, res, next);
                    sign.signNewBYB(req, res, next,tx);
                }
                if(req.body.token=="jjj"){
                    sign.signNewJJJ(req, res, next);
                }
                if(req.body.token=="usdt"){
                        sign.signUSDT(req, res, next);
                }

                if(req.body.token=="btc"){
			console.log("btcsign")
                        sign.signBTC(req, res, next);
                }
                if(req.body.token=="btcrelay"){
                        console.log("btcrelaysign")
                        sign.signBTCrelay(req, res, next);
                }
		if (req.body.token == "ltc") {
			console.log("ltc")
			sign.signLTC(req, res, next);
		}
		if (req.body.token == "bch") {
			console.log("bch")
			sign.signBCH(req, res, next);
		}
                if (req.body.token == "cic") {
                        console.log("cic")
                        sign.signCIC(req, res, next);
                }
	},

	deploy_contract:  function deploy_contract(req, res, next){

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
		console.log(date+":transactionListRange");
                var data = [];
                var initialBlock = req.params.initialBlock;
                var finalBlock = req.params.finalBlock;
//console.log(initialBlock)
//console.log(finalBlock)
                var a=0;
                        for(var leng=parseInt(initialBlock);leng<=parseInt(finalBlock);leng++){
				console.log(date+":transactionListRange","readBlock",leng);
                                var blockinfo = web3.eth.getBlock(leng, true);
				a = a+blockinfo.transactions.length;
                                blockinfo.transactions.forEach(function(element){
                                        data.push(element);
                                        //console.log(a);
                                        //console.log(data.length)
					//console.log(data);
					//console.log(finalBlock);/*
                                        if(leng == finalBlock&&data.length == a){
						console.log(date+":transactionListRange-success");
						a = 0;
                                        	res.send(data)
                                        }
                                });
                                if(leng == finalBlock&&data.length == a){
					console.log(date+":transactionListRange-success");
                                	res.send(data)
                                }
                        }
	},

        transactionTokenListRange:  function transactionTokenListRange(req, res, next){

//console.log(address[req.params.token])
                console.log(date+":transactiontokenListRange");
                var data = [];
                var initialBlock = req.params.initialBlock;
                var finalBlock = req.params.finalBlock;
                var a=0;
//console.log(123)
                        for(var leng=parseInt(initialBlock);leng<=parseInt(finalBlock);leng++){
//console.log(123)				
                                console.log(date+":transactiontokenListRange","readBlock",leng);
                                var blockinfo = web3.eth.getBlock(leng, true);
                                a = a+blockinfo.transactions.length;
                                blockinfo.transactions.forEach(function(element){
                                        if(element.to != address[req.params.token] || element.input.substr(0,10) != "0xa9059cbb"){
                                                a =a-1;
                                        }
					if(element.to == address[req.params.token]){
						if(element.input.substr(0,10) == "0xa9059cbb"){
							element.to = "0x"+element.input.substr(34,40);
							element.value = parseInt(element.input.substr(74,64),16).toString();
                                        		//console.log(element)
							data.push(element);
						
						}
					}
                                        //console.log(a);
                                        //console.log(data.length)
                                        //console.log(data);
                                        //console.log(finalBlock);/*
                                        
					if(leng == finalBlock&&data.length == a){
                                                console.log(date+":transactionListRange-success");
                                                a = 0;
                                                res.send(data)
                                        }
                                });
                                if(leng == finalBlock&&data.length == a){
                                        console.log(date+":transactionListRange-success");
                                        res.send(data)
                                }
                        }
        },

	transactionList:  function transactionList(req, res, next){
		incomeBalance.transactionList(req, res, next);
	},
    block:  function block(req, res, next){
	    var result = web3.eth.getBlock(req.params.number);
		res.send(result)
	},

        newSign:  function newSign(req, res, next){
		console.log(123)
                sign.newSign(req, res, next);

        },

	blockNumber:  function blockNumber(req, res, next){
		console.log(date+":blockNumber");
		//var nodeConnect = 'http://'+config.nodeip+':'+config.rpcPort;

		//web3.setProvider(new web3.providers.HttpProvider(nodeConnect));
		console.log(date+":blockNumber-success");
		res.send(web3.eth.blockNumber.toString());

	},
	transactionCount:  function transactionCount(req, res, next){
		console.log(date+":transactionCount");
		console.log(date+":transactionCount-success");
		res.send(web3.eth.getTransactionCount(req.params.address).toString());

	},
	transactionReceipt:  function transactionReceipt(req, res, next){
		console.log(date+":transactionReceipt");
		var result = web3.eth.getTransaction(req.params.address);
/*		try{
			if(result.input.substr(34,40)){
				result.to = result.input.substr(34,40);
				result.value = parseInt(result.input.substr(74,64),16).toString();
				console.log(date+":transactionReceipt-success");
				*/res.send(result);
			/*}
			else{	
				console.log(date+":transactionReceipt-success");
				res.send(result)
			}
		}
		catch(error){
			console.log("this address is error")
			res.send("error")
		}
*/
	},
        transaction:  function transactionReceipt(req, res, next){
                console.log(date+":transactionReceipt");
                var result = web3.eth.getTransactionReceipt(req.params.address);
                var address = result.logs[0].topics[1];
                address = "0x"+address.substr(26,66);
		var value = result.logs[0].data;
		//console.log(value)
                value = parseInt(value.substr(2,66),16);
                var json = {"address":address,"value":value}
                res.send(json);
        },
        transactionTokenReceipt:  function transactionTokenReceipt(req, res, next){
                console.log(date+":transactionReceipt");
		var result = web3.eth.getTransaction(req.params.address);
		try{
			result.to = result.input.substr(34,40);
			result.value = parseInt(result.input.substr(74,64),16).toString();
                	console.log(date+":transactionReceipt-success");
			res.send(result)
                }
		catch(err){
			console.log("this address is error");
			res.send(result);
		}
        },

	getBalance:  function getBalance(req, res, next){
		balance.getBalance(req, res, next);
		/*
		console.log(date+":getBalance");
		console.log(date+":getBalance-success");
		res.send(web3.eth.getBalance(req.params.address));
		*/
	},
        getBalance_app:  function getBalance_app(req, res, next){
                balance.getBalance_app(req, res, next);
                /*
                console.log(date+":getBalance");
                console.log(date+":getBalance-success");
                res.send(web3.eth.getBalance(req.params.address));
                */
        },
        getTokenBalance:  function getTokenBalance(req, res, next){
                console.log(date+":Token");
		var CoursetroContract = web3.eth.contract(abi["abi"]);
		var Coursetro = CoursetroContract.at(address[req.params.token]);

		Coursetro.balanceOf(req.params.address,function(error, result) {
		if (!error) {
			//console.log(result)
	                console.log(date+":getTokenBalance-success");
                	res.send(result);
           	} else
        	        console.log(error);
       		});
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
		sign.newSign(req, res, next);
/*		console.log(date+":HC_signInformationIn");
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
*/
	},


	HC_signTokenInformationIn:  function HC_signTokenInformationIn(req, res, next){
		console.log(date+":HC_signInformationIn");
		//const gasPrice = web3.eth.gasPrice;

		const gasPriceHex = "0x"+parseInt(req.params.gasPrice).toString(16);

		const gasLimitHex = "0x"+parseInt(req.params.gasLimit).toString(16);

		const nonce = req.params.nonce;

		const nonceHex = "0x"+parseInt(nonce).toString(16);

		var func = "0xa9059cbb000000000000000000000000"

		var to = req.params.to

		var amount = toHex.toHex(req.params.value.toString())//parseInt(req.params.value).toString(16)
//console.log(req.params.value);
//console.log(amount);
//console.log(toHex.toHex(req.params.value))
		var input = func+to.substr(2)+paddingLeft(amount,64);

		var rawTx = {

		    nonce: nonceHex,

		    gasLimit: gasLimitHex,

		    to: address[req.params.token],

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

	},
        BYB_sign: function HC_signInformationIn(req, res, next){
                console.log(date+":HC_signInformationIn");
                //const gasPrice = web3.eth.gasPrice;

                const gasPriceHex = "0x"+parseInt(10000000000).toString(16);

                const gasLimitHex = "0x"+parseInt(21000).toString(16);

                const nonce = web3.eth.getTransactionCount(req.params.from);

                const nonceHex = "0x"+parseInt(nonce).toString(16);
				console.log(12346)
                var rawTx = {

                    nonce: nonceHex,

                    gasLimit: gasLimitHex,

                    to: req.params.to,

                    value: parseInt(req.params.value),


                    gasPrice: gasPriceHex
                }
                console.log(date+":HC_signInformationIn-success");
                console.log(date+":CC_signInformation");
                //console.log(req.params.rawtx);

                var tx = new Tx(rawTx);
//console.log(1)
                var privateKey = new Buffer(req.params.key, 'hex')
//console.log(2)
                tx.sign(privateKey);
//console.log(3)
                var serializedTx = tx.serialize();
                var result = '{"signText":"'+serializedTx.toString('hex')+'","tx":'+req.params.rawtx+'}';
                console.log(date+":CC_signInformation:success");
		res.send(serializedTx.toString('hex'))
        },
	CC_signInformation:  function CC_signInformation(req, res, next){

		if(req.body.token=="eth"||req.body.token==undefined){
			sign.signETH(req, res, next);
		}

		if(req.body.token=="usdt"){
			sign.signUSDT(req, res, next);
		}

                if(req.body.token=="btc"){
                        sign.signBTC(req, res, next);
                }

                if(req.body.token=="ethapp"){
                        sign.signETHapp(req, res, next);
                }

/*
		console.log(date+":CC_signInformation");
		//console.log(req.params.rawtx);

		var tx = new Tx(JSON.parse(req.params.rawtx));

		var privateKey = new Buffer(req.params.privateKey, 'hex')

		tx.sign(privateKey);

		var serializedTx = tx.serialize();
		var result = '{"signText":"'+serializedTx.toString('hex')+'","tx":'+req.params.rawtx+'}';
		console.log(date+":CC_signInformation:success");
		res.send(result);
*/
	},

	HC_signInformationOut:  function HC_signInformationOut(req, res, next){
                      
	        if(req.body.token=="eth"||req.body.token==undefined){
	                request.get('https://api.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex='+"0x"+req.params.serializedTx.toString('hex')+'&apikey=W673F5JT2IIGUWSCQYJ3ZMQTYMPHHNMZGA');
			//web3.setProvider(new web3.providers.HttpProvider(process.argv[5]));
                       
	                web3.eth.sendRawTransaction("0x"+req.params.serializedTx.toString('hex'), function(err, hash) {
	                        if(err != null){
	                                console.log(err);
                                        
	                                res.send("error");
	                                
	                        }
	                        else{
	                                console.log(date+":"+hash);
	                                res.send(hash.toString());
	                        }
	                });
                        
		}
	
	if(req.body.token=="usdt"||req.body.token=="btc"){
		broadcast.btcbroadcast(req, res, next);
	}

	},

/*
	HC_signInformationOut:  function HC_signInformationOut(req, res, next){
		console.log(date+":HC_signInformationOut",req.params.serializedTx.toString('hex'));
		web3.eth.sendRawTransaction("0x"+req.params.serializedTx.toString('hex'), function(err, hash) {

			if(err != null){

				console.log(err);

				res.send("error");

				return ;

			}

			if (!err){
				console.log(date+":"+hash);
				res.send(hash.toString()); 

			}

		});

	},
*/
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





































