var bip39 = require("bip39")
var bip32 = require("bip32")
var bitcoin = require('bitcore-lib')
var HDKey = require('hdkey')
var bitcoinjs = require("bitcoinjs-lib")
var EthereumBip44 = require('ethereum-bip44');
var litecore = require('litecore');

var ethereum = require('ethereumjs-wallet')

const secp256k1 = require('secp256k1')
var sha256 = require("sha256")

module.exports = {
	account:function account(req, res, next){
		//bitcoin
		if(req.body.mnemonic!=undefined){
		var mnemonic = req.body.mnemonic;
		}else{
		var mnemonic = bip39.generateMnemonic()
		}
		var seed = bip39.mnemonicToSeedHex(mnemonic)
		var hdkey = HDKey.fromMasterSeed(new Buffer(seed, 'hex'))
		var HDkey = hdkey.privateExtendedKey
		var node = bip32.fromBase58(HDkey)
		var child = node.derivePath("m/44'/0'/0'/0/0")
		bitcoinKey = child.toWIF()


		var key = bitcoin.HDPrivateKey(HDkey);	
		var wallet = new EthereumBip44(key);
		//ethereum
		var ethereumKey = wallet.getPrivateKey(0).toString('hex')
		var ethereumAddress = wallet.getAddress(0)
		var keyPair = bitcoinjs.ECPair.fromWIF(bitcoinKey)
		var bitcoinAddress = keyPair.getAddress()

		//litecoin
		//var litecore = require('litecore');
		var privateKey = new litecore.PrivateKey(ethereumKey);
		var litecoinKey = privateKey.toWIF()
		var litecoinAddress = privateKey.toAddress().toString();

                var bitcoinprivateKey = new bitcoin.PrivateKey(ethereumKey);
                var btcAddress = bitcoinprivateKey.toAddress().toString();
                var btcKey = bitcoinprivateKey.toWIF()
                var cic = ethereum.fromPrivateKey(Buffer.from(ethereumKey,"hex"))
                var cicpub = cic.getPublicKey().toString("hex");

		var re = secp256k1.publicKeyCreate(Buffer.from(ethereumKey,"hex"), false).slice(1)
		var cicAddress = "cx"+sha256("0x"+re.toString("hex")).substr(24,64)
		
		var re = {
			"version":"0.01","mnemonic":mnemonic,"HDkey":HDkey,
				"litecoin":
				{"privateKey":litecoinKey,"address":litecoinAddress},
				"bitcoin":
				{"privateKey":btcKey,"address":btcAddress},
				"ethereum":
				{"privateKey":ethereumKey,"address":ethereumAddress},
				"cic":
				{"privateKey":ethereumKey,"address":cicAddress}
				}
		//console.log(re)
		res.send(re);
	},
	HDkeyToAddress:function HDkeyToAddress(req, res, next){
        	var HDkey = req.body.HDKey
        	var variable = req.body.variable
        	var node = bip32.fromBase58(HDkey)
        	var child = node.derivePath("m/44'/60'/0'/0/"+variable)
        	bitcoinKey = child.toWIF()
        	//console.log(child.privateKey.toString('hex'))
        	//var key = child.privateKey.toString('hex')//bitcoin.HDPrivateKey(HDkey)
        	//var wallet = new EthereumBip44();
        	//ethereum
        	var ethereumKey = child.privateKey.toString('hex')//wallet.getPrivateKey(0).toString('hex')
        	var ethereumAddress = "0x"+ethereum.fromPrivateKey(Buffer.from(ethereumKey, 'hex')).getAddress().toString('hex')//wallet.getAddress(0)
        	var keyPair = bitcoinjs.ECPair.fromWIF(bitcoinKey)
        	var bitcoinAddress = keyPair.getAddress()

        	//litecoin
        	//var litecore = require('litecore');
        	var privateKey = new litecore.PrivateKey(ethereumKey);
        	var litecoinKey = privateKey.toWIF()
        	var litecoinAddress = privateKey.toAddress().toString();

        	var bitcoinprivateKey = new bitcoin.PrivateKey(ethereumKey);
        	var btcAddress = bitcoinprivateKey.toAddress().toString();
        	var btcKey = bitcoinprivateKey.toWIF()

        	var cic = ethereum.fromPrivateKey(Buffer.from(ethereumKey,"hex"))
        	var cicpub = cic.getPublicKey().toString("hex");

        	var re = secp256k1.publicKeyCreate(Buffer.from(ethereumKey,"hex"), false).slice(1)
        	var cicAddress = "cx"+sha256("0x"+re.toString("hex")).substr(24,64)
        	var re = {
            		"version":"0.01","HDkey":HDkey,
            		"litecoin":
            		{"privateKey":litecoinKey,"address":litecoinAddress},
            		"bitcoin":
            		{"privateKey":btcKey,"address":btcAddress},
          		"ethereum":
            		{"privateKey":ethereumKey,"address":ethereumAddress},
            		"cic":
            		{"privateKey":ethereumKey,"address":cicAddress}
        	}
        	//console.log(re)
        	res.send(re);
    	},

	keyToAddress:function keyToAddress(req, res, next){

		var keyx = req.body.key

                if(keyx.length!=64){
                var bitcoinprivateKey = new bitcoin.PrivateKey(keyx);
                keyx = bitcoinprivateKey.toString()
                }

                //var bitcoinAddress = keyPair.getAddress()


                var bitcoinprivateKey = new bitcoin.PrivateKey(keyx);
                var bitcoinAddress = bitcoinprivateKey.toAddress().toString();
                var bitcoinKey = bitcoinprivateKey.toString()

		var cicAddress = "cx" + sha256(publicKey.toString("hex")).substr(24, 64) 

                //litecoin
                //var litecore = require('litecore');
/*
                var privateKey = new litecore.PrivateKey(keyx);
                var litecoinAddress = privateKey.toAddress().toString();
                var litecoinKey = privateKey.toString()

                console.log(litecoinAddress)
*/
                var x = ethereum.fromPrivateKey(Buffer.from(keyx,"hex"))
                ethereumAddress = x.getAddress().toString("hex");
                var re = {
                        "version":"0.01",
                                /*"litecoin":
                                {"address":litecoinAddress},*/
                                "bitcoin":
                                {"address":bitcoinAddress},
                                "ethereum":
				{"address":ethereumAddress}
                                }
		res.send(re)
	},
        accountQT:function accountQT(req, res, next){		
		var result = [];
		var times = 0;
		var keyAmounts = req.params.amount;
		//var type = req.params.type;
		function mn(){
   	             var mnemonic = bip39.generateMnemonic()
        	        var seed = bip39.mnemonicToSeedHex(mnemonic)
               		var hdkey = HDKey.fromMasterSeed(new Buffer(seed, 'hex'))
                	var HDkey = hdkey.privateExtendedKey
                	var node = bip32.fromBase58(HDkey)
                	var child = node.derivePath("m/44'/0'/0'/0/0")
                	bitcoinKey = child.toWIF()
                	var key = bitcoin.HDPrivateKey(HDkey);
                        var keyPair = bitcoinjs.ECPair.fromWIF(bitcoinKey)
                        var bitcoinAddress = keyPair.getAddress()			
		//ethereum
                	var wallet = new EthereumBip44(key);
                	var ethereumKey = wallet.getPrivateKey(0).toString('hex')
                	var ethereumAddress = wallet.getAddress(0)
                	//var keyPair = bitcoinjs.ECPair.fromWIF(bitcoinKey)
                	//var bitcoinAddress = keyPair.getAddress()
//			console.log(ethereumAddress);
                //litecoin
                //var litecore = require('litecore');
                	var privateKey = new litecore.PrivateKey(ethereumKey);
                	var litecoinAddress = privateKey.toAddress().toString();
                	var litecoinKey = privateKey.toWIF();			
	
                	var BCCprivateKey = new bitcoin.PrivateKey();
                	var BCCKey = BCCprivateKey.toWIF();
                	var BCCpublicKey = BCCprivateKey.toPublicKey();
                	var BCCAddress = BCCpublicKey.toAddress("mainnet").toString();
                        var USDTprivateKey = new bitcoin.PrivateKey();
                        var USDTKey = USDTprivateKey.toWIF();
                        var USDTpublicKey = USDTprivateKey.toPublicKey();
                        var USDTAddress = USDTpublicKey.toAddress("mainnet").toString();
			result.push({"TypeID":20,"coin":"USDT","privateKey":USDTKey,"address":USDTAddress},{"TypeID":3,"coin":"bitcoincash","privateKey":BCCKey,"address":BCCAddress},{"TypeID":2,"coin":"litecoin","privateKey":litecoinKey,"address":litecoinAddress},{"TypeID":1,"coin":"bitcoin","privateKey":bitcoinKey,"address":bitcoinAddress},{type:4,"coin":"ethereum","privateKey":ethereumKey,"address":ethereumAddress})
		}
		loop()
		function loop(){
                                mn();
                                times++;
				console.log("keypublish:"+times)
                                if(times != keyAmounts){
                                loop();
                                }
		}
                	res.send(result);
        }
}
/*
var keyPair = bitcoinjs.ECPair.fromWIF(bitcoinKey)
var address = keyPair.getAddress()
console.log(address)

*/
