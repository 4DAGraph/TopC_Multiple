const Client = require('bitcoin-core');
const client = new Client({host:'192.168.51.33',port:'8332' ,username: 'bitcoinrpc', password: 'bitcoinrpctest', network: 'regtest'})


client.listUnspent(0,9999999,["1Pi1Spap6vdfAWJPfMkYUCtG4EYM5fPWeR"],function(error,rr){
console.log(error)
console.log(rr)
});

//client.getTransactionByHash('e7dfeec5f2e6fa248af10a22602955d943c0a0367707a4aaa2362fd68b63a106', { extension: 'json', summary: false });

/*
client.getRawTransaction('9495d043df0acf0d68a681069b1b432469a25ee14c3370ec735db0eb8cd2391f',true,function(err, result){
//console.log(result.vout)
//console.log(result.vout[0].scriptPubKey.addresses[0])
	data = [];
	var times = 0;
	result.vout.forEach(function(element){
		times++;
		//console.log(element)
		//data.push(element)
		try{
			element.to = element.scriptPubKey.addresses[0]
			element.token = "btc"
		}
		catch(error){
			//console.log("pass")
		}
		//element.address = element.scriptPubKey.addresses[0]
		data.push(element)
		
		if(result.vout.length == times){
			console.log(data)
		}
	})
});
*/
//console.log(x)
/*
const txHex = ''

client.sendRawTransaction(txHex, (error, response) => {
  if (error) console.log(error);
  console.log(response);
});
*/
/*
client.getDifficulty(function(err, difficulty) {
  if (err) {
    return console.error(err);
  }
 
  console.log('Difficulty: ' + difficulty);
});
*/
