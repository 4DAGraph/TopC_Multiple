const Client = require('bitcoin-core');
const client = new Client({host:'192.168.51.33',port:'8332' ,username: 'bitcoinrpc', password: 'bitcoinrpctest', network: 'regtest'})

module.exports = {
	btcbroadcast:function btcbroadcast(req, res, next){
                const client = new Client({host:'192.168.51.33',port:'8332' ,username: 'bitcoinrpc', password: 'bitcoinrpctest', network: 'regtest'})
		//const Client = require('bitcoin-core');
		//const client = new Client({host:'192.168.51.33',port:'8332' ,username: 'bitcoinrpc', password: 'bitcoinrpctest', network: 'regtest'})
		const txHex = req.params.serializedTx;
                console.log("bro")
		client.sendRawTransaction(txHex, (error, response) => {
			if (error){ console.log(error); res.send("error")}
			else{
			res.send(response);
			}
		});
	},
	btcunspend:function btcunspend(req, res, next){
		client.listUnspent(0,99999999,[req.params.address],function(error,rr){
			res.send(rr);
		});
	}

}
