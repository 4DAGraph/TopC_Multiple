//var assert = require('assert')
var bitcoin = require('../bitcoinjs')
var toHex = require('./bigIntToHex.js')
var bitcoin2 = require('bitcoinjs-lib')
//var regtestUtils = require('./_regtest')
//var regtest = regtestUtils.network
//var util = require('util')
/*
var keyPair = bitcoin.ECPair.fromWIF('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy')
var txb = new bitcoin.TransactionBuilder()
var data = Buffer.from('6f6d6e69000000000000001f00000002540be400', 'hex')
var dataScript = bitcoin.script.nullData.output.encode(data)
txb.addInput('6c215b731831dceed69f2a36312ef1b305df8ad3af57df37609b571b9727e42d', 0)
txb.addOutput(dataScript, 0)
txb.addOutput('1138DmfNXq44erShdVnfTgRJuNsdkLhcj1', 7430)
txb.addOutput('1qQZ8X1waotobH7yHzyE41pMtxBYb9Ykg', 5460)
txb.sign(0, keyPair)
console.log(txb.build().toHex())
*/
tx = [{address:"1138DmfNXq44erShdVnfTgRJuNsdkLhcj1",value:7430},{address:"1qQZ8X1waotobH7yHzyE41pMtxBYb9Ykg",value:5460}]
unspend = [{txid:"6c215b731831dceed69f2a36312ef1b305df8ad3af57df37609b571b9727e42d",value:0}]
/*
tx.forEach(function(result){
	console.log(result)
})
*/
//console.log(tx[0])
//signUSDT("L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy",tx,unspend)
signBTC("L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy",tx,unspend)

function signUSDT(priv,tx,unspend){
        var keyPair = bitcoin.ECPair.fromWIF(priv)
        var txb = new bitcoin.TransactionBuilder()
        //txb.addInput('6c215b731831dceed69f2a36312ef1b305df8ad3af57df37609b571b9727e42d', 0)
        unspend.forEach(function(result){
                txb.addInput(result.txid,result.value)
        })
	var usdtvalue = toHex.toHex(tx[0].address);
	usdtvalue = paddingLeft(usdtvalue,16)
	//console.log(usdtvalue)
        var data = Buffer.from('6f6d6e69000000000000001f'+usdtvalue, 'hex')
        var dataScript = bitcoin.script.nullData.output.encode(data)
	txb.addOutput(dataScript, 0)
        tx.forEach(function(result){
	        txb.addOutput(result.address,result.value)
        })
        txb.sign(0, keyPair)
        console.log(txb.build().toHex())
}

function signBTC(priv,tx,unspend){
        var keyPair = bitcoin.ECPair.fromWIF(priv)
        var txb = new bitcoin.TransactionBuilder()
        //txb.addInput('6c115b731831dceed69f2a36312ef1b305df8ad3af57df37609b571b9727e42d', 0)
	unspend.forEach(function(result){
		txb.addInput(result.txid,result.value)
	})
	tx.forEach(function(result){
        	txb.addOutput(result.address,result.value)
	})
	var inputs_t = 0;
	unspend.forEach(function(result){
		console.log(unspend)
                txb.sign(inputs_t, keyPair);
		inputs_t = inputs_t+1;
        })
	inputs_t = 0
        //txb.sign(0, keyPair)
        
        console.log(txb.build().toHex())
}

function paddingLeft(str,lenght){
	if(str.length >= lenght)
		return str;
		else
		return paddingLeft("0" +str,lenght);
}
