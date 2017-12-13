var request = require('request');
var config = require('../config/default.js');
var nodeConnect = 'http://'+config.nodeip+':'+config.rpcPort;
var Web3 = require('web3');
var web3 = new Web3();
var nodejsConnect = 'http://'+config.nodeip+':'+config.port;
console.log(nodejsConnect)
web3.setProvider(new web3.providers.HttpProvider(nodeConnect));
module.exports = {
	txout: function txout(req, res, next){
		ccTest(req, res, next);
	//	HcInTest(req, res, next);
	}
}
function HcInTest(req, res, next){
console.log(nodeConnect)
	request.post(
    	nodejsConnect+'/topChain/HC_signInformationIn/0x6a2f20a64dc0f784195db570ac14b2d2359fdb88/210000/26/1/20000000000" } ',
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


function ccTest(req, res, next){

	const nonce = web3.eth.getTransactionCount("0x9Bf2dBACE6533Dabd88fE2d2A2A7Be10EA8Cb995");

	const nonceHex = web3.toHex(nonce);
	request.post(
		nodejsConnect+'/topChain/CC_signInformation/07c97e0a6a71d9b707f1eb9d89a2c0dd40904a5baf7f227f938b95460dce32ba/{ "nonce": "'+nonceHex+'", "gasLimit": "0x5208", "to":"0x00765c5d8a2b57b75d77a77b85ff10898168cac4", "value": 10000000000000000, "gasPrice": "0x1" } ',
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("\n2.CC_signInformation:\n")
				console.log("*method:post\n")
				console.log("*formate:/CC_signInformation/:privateKey/:rawtx\n")
				console.log("*result:")
				console.log(body)
				//callpoint
				HcOutTest(req, res, next,JSON.parse(body).signText)
			}
		}
	);

}


function HcOutTest(req, res, next, tx){
	request.post(
		nodejsConnect+'/topChain/HC_signInformationOut/'+tx,
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("\n3.CC_signInformation:\n")
				console.log("*method:post\n")
				console.log("*formate:/HC_signInformationOut/:serializedTx\n")
				console.log("*result:")
				console.log(body)
				res.send(body)
			}
		}
	);
}

