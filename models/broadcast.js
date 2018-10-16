const Client = require('bitcoin-core');
//const client = new Client({host:'192.168.51.33',port:'8332' ,username: 'bitcoinrpc', password: 'bitcoinrpctest', network: 'regtest'})

module.exports = {
	btcbroadcast:function btcbroadcast(req, res, next){
                //const client = new Client({host:'192.168.51.179',port:'8778' ,username: 'bitcoinrpc', password: 'bitcoinrpctest', network: 'mainnet'})
                const client = new Client({host:'192.168.51.156',port:'8332' ,username: 'bitcoinrpc', password: 'bitcoinrpctest', network: 'regtest'})
		//const Client = require('bitcoin-core');
		//const client = new Client({host:'192.168.51.33',port:'8332' ,username: 'bitcoinrpc', password: 'bitcoinrpctest', network: 'regtest'})
		const txHex = req.params.serializedTx;
                console.log("bro")
		client.sendRawTransaction(txHex, (error, response) => {
			if (error){ console.log(error); res.send(error.message)}
			else{
			res.send(response);
			}
		});
	},
	btcunspend:function btcunspend(req, res, next){
                if(req.body.type != undefined){
			const client = new Client({host:req.body.host,port:req.body.port ,username:req.body.username, password:req.body.password, network:req.body.network})
		//console.log(client)
                client.listUnspent(0,99999999,[req.params.address],function(error,rr){
                        console.log(error)
                        res.send(rr);
                	}); 
                }
		else{
                        const client = new Client({host:'192.168.51.156',port:'8332' ,username: 'bitcoinrpc', password: 'bitcoinrpctest', network: 'regtest'})
			client.listUnspent(0,99999999,[req.params.address],function(error,rr){
                                console.log(error)
				res.send(rr);
			});
		}
	}

}
