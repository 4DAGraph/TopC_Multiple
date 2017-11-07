var Web3 = require('web3');
var web3 = new Web3();
var Tx = require('ethereumjs-tx');
//節點RPC設定
web3.setProvider(new web3.providers.HttpProvider('http://'+"localhost"+':8545'));
 
//熱錢包參數設定,value為欲傳輸之wei數量, web3.eth.accounts[1]為傳輸對象
const gasPrice = web3.eth.gasPrice;
const gasPriceHex = web3.toHex(gasPrice);
const gasLimitHex = web3.toHex(300000);
const nonce = web3.eth.getTransactionCount(web3.eth.coinbase);
console.log(nonce);
const nonceHex = web3.toHex(24);
var rawTx = {
    nonce: nonceHex,
    gasLimit: gasLimitHex,
    to: "0x6a2f20a64dc0f784195db570ac14b2d2359fdb88",
    value: 1000
}

//冷錢包利用私鑰作為簽章
var tx = new Tx(rawTx);
var privateKey = new Buffer('0f71788cb20ad6e4fce227271954be9ed09c619e06f60ad9781fa614f989d7fb', 'hex')
tx.sign(privateKey);
var serializedTx = tx.serialize();
console.log(serializedTx.toString('hex'));

//熱錢包將簽章送出交易
web3.eth.sendRawTransaction("0x"+serializedTx.toString('hex'), function(err, hash) {
	console.log(err);
  if (!err)
    console.log(hash); 
});
