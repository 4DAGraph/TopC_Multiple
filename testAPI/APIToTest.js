var request = require('request');
var config = require('../config/default.js');
var nodeConnect = 'http://'+config.nodeip+':'+config.rpcPort;
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(nodeConnect));
module.exports = {
	txout: function txout(req, res, next){
		ccTest(req, res, next);
		HcInTest(req, res, next);
	}
}
function HcInTest(req, res, next){

	request.post(
    	'http://192.168.51.202:3200/topChain/HC_signInformationIn/0x6a2f20a64dc0f784195db570ac14b2d2359fdb88/210000/26/1/20000000000" } ',
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

	const nonce = web3.eth.getTransactionCount("0xe70C2ee30cbF71f92D6C3bC6153Fa588046b84D7");

	const nonceHex = web3.toHex(nonce);

	request.post(
		'http://192.168.51.202:3200/topChain/CC_signInformation/54dee1a12baaccb5589e062aa59bf72b95f689d260665770073bc095cc7c7e7c/{ "nonce": "'+nonceHex+'", "gasLimit": "0x5208", "to":"0x00765c5d8a2b57b75d77a77b85ff10898168cac4", "value": 1, "gasPrice": "05F5E100" } ',
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


function HcOutTest(req, res, next, tx){
	request.post(
		'http://192.168.51.202:3200/topChain/HC_signInformationOut/'+tx,
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


