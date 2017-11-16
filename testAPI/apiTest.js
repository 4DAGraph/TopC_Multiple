var request = require('request');
var sha256 = require('sha256');
var config = require('../config/default.js');
var nodeConnect = 'http://'+config.nodeip+':'+config.rpcPort;
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(nodeConnect));
//ccTest();
//HcInTest();
function checkPost(funcName,url,bodyJson,answer){

	request.post(
    		url,
    		{ json: bodyJson },
    		function (error, response, body) {
        		if (!error && response.statusCode == 200) {
				console.log("funcName:",funcName)
				console.log("ans:",answer)
				console.log("body:",body)
        			if(body == answer){
					console.log("pass")
				}
				else{
					console.log("error")
				}
        		}
    		}
	);
}

function checkGet(funcName,url,bodyJson,answer){

	request.get(
    		url,
    		function (error, response, body) {
        		if (!error && response.statusCode == 200) {
				console.log("funcName:",funcName)
				console.log("ans:",answer)
				console.log("body:",body)
        			if(body === answer){
					console.log("pass")
				}
				else{
					console.log("error")
				}
        		}
    		}
	);
}

testStart()
function testStart(){
	checkPost(
		"HC_signInformationIn",
		'http://127.0.0.1:3200/topChain/HC_signInformationIn/0x6a2f20a64dc0f784195db570ac14b2d2359fdb88/210000/26/1/20000000000" } ',
		{},
		{ nonce: '0x1a',
		gasLimit: '0x33450',
		to: '0x6a2f20a64dc0f784195db570ac14b2d2359fdb88',
		value: 1,
		gasPrice: '0x323030303030303030303022207d' }
	)
	checkPost(
		"CC_signInformation",
		'http://127.0.0.1:3200/topChain/CC_signInformation/07c97e0a6a71d9b707f1eb9d89a2c0dd40904a5baf7f227f938b95460dce32ba/{ "nonce": "0x1", "gasLimit": "0x5208", "to":"0x00765c5d8a2b57b75d77a77b85ff10898168cac4", "value": 1, "gasPrice": "0x05F5E100" } ',
		{},
		{ signText: 				'f863018405f5e1008252089400765c5d8a2b57b75d77a77b85ff10898168cac401801ca023a32b9d673493dcd7645a63d19dfc62396619be3390fd8c21d74a72f8fc7269a00651fc3893b0c47ce89121885e963d4b8210d5330f75652126c540e108ac71df',
  			tx:
			{ nonce: '0x1',
			gasLimit: '0x5208',
			to: '0x00765c5d8a2b57b75d77a77b85ff10898168cac4',
			value: 1,
			gasPrice: '0x05F5E100' }
		}
	)
	checkGet(
		"blockNumber",
		'http://127.0.0.1:3200/topChain/blockNumber',
		{},
		1467
	)
	checkGet(
		"getBalance",
		'http://127.0.0.1:3200/topChain/getBalance/0xe70C2ee30cbF71f92D6C3bC6153Fa588046b84D7',
		{},
		"0"
	)
	checkGet(
		"key_publish",
		'http://127.0.0.1:3200/topChain/key_publish/1',
		{},
		""
	)
	checkGet(
		"transactionListRange",
		'http://127.0.0.1:3200/topChain/transactionListRange/1/10',
		{},
		""
	)
}

function HcInTest(){

	request.post(
    		'http://127.0.0.1:3200/topChain/HC_signInformationIn/0x6a2f20a64dc0f784195db570ac14b2d2359fdb88/210000/26/1/20000000000" } ',
    		{ json: { key: 'value' } },
    		function (error, response, body) {
        		if (!error && response.statusCode == 200) {
        		    console.log("\n1.HC_signInformationIn:\n")
        		    console.log("*method:post\n")
        		    console.log("*formate:/HC_signInformationIn/:to/:gasLimit/:nonce/:value/:gasPrice\n")
        		    console.log("*result:")
        		    console.log(body)
        		}
    		}
	);
}


function ccTest(){

	const nonce = web3.eth.getTransactionCount("0x9Bf2dBACE6533Dabd88fE2d2A2A7Be10EA8Cb995");

	const nonceHex = web3.toHex(nonce);

	request.post(
		'http://127.0.0.1:3200/topChain/CC_signInformation/07c97e0a6a71d9b707f1eb9d89a2c0dd40904a5baf7f227f938b95460dce32ba/{ "nonce": "'+nonceHex+'", "gasLimit": "0x5208", "to":"0x00765c5d8a2b57b75d77a77b85ff10898168cac4", "value": 1, "gasPrice": "0x05F5E100" } ',
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("\n2.CC_signInformation:\n")
				console.log("*method:post\n")
				console.log("*formate:/CC_signInformation/:privateKey/:rawtx\n")
				console.log("*result:")
				console.log(body)
				//callpoint
				HcOutTest(JSON.parse(body).signText)
			}
		}
	);

}


function HcOutTest(tx){
	request.post(
		'http://127.0.0.1:3200/topChain/HC_signInformationOut/'+tx,
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("\n3.CC_signInformation:\n")
				console.log("*method:post\n")
				console.log("*formate:/HC_signInformationOut/:serializedTx\n")
				console.log("*result:")
				console.log(body)
			}
		}
	);
}

function blockNumber(){
	request.get(
		'http://127.0.0.1:3200/topChain/blockNumber',
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("\n4.blockNumber:\n")
				console.log("*method:get\n")
				console.log("*formate:/blockNumber\n")
				console.log("*result:")
				console.log(body)
			}
		}
	);
}


function transactionListRange(){
	request.get(
		'http://192.168.51.202:3200/transactionListRange/1000/2000',
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("\n4.transactionListRange:\n")
				console.log("*method:get\n")
				console.log("*formate:/transactionListRange/:initialBlock/:finalBlock\n")
				console.log("*result:")
				console.log(body)
			}
		}
	);
}

function key_publish(){
	request.get(
		'http://192.168.51.202:3200/key_publish/10',
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("\n4.key_publish:\n")
				console.log("*method:get\n")
				console.log("*formate:/key_publish/:amounts\n")
				console.log("*result:")
				console.log(body)
			}
		}
	);
}

function getBalance(){
	request.get(
		'http://192.168.51.202:3200/getBalance/0xe70C2ee30cbF71f92D6C3bC6153Fa588046b84D7',
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("\n4.getBalance:\n")
				console.log("*method:get\n")
				console.log("*formate:/getBalance/:address\n")
				console.log("*result:")
				console.log(body)
			}
		}
	);
}

