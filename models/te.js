var bip39 = require("bip39")
var bip32 = require("bip32")
var bitcoin = require('bitcore-lib')
var HDKey = require('hdkey')
var bitcoinjs = require("bitcoinjs-lib")
var EthereumBip44 = require('ethereum-bip44');
var litecore = require('litecore');

                var mnemonic = bip39.generateMnemonic()
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
                var privateKey = new litecore.PrivateKey();

                var litecoinAddress = privateKey.toAddress().toString();
                var litecoinKey = privateKey.toString()

                var re = {
                        "version":"0.01","mnemonic":mnemonic,"HDkey":HDkey,
                                "litecoin":
                                {"privateKey":litecoinKey,"address":litecoinAddress},
                                "bitcoin":
                                {"privateKey":bitcoinKey,"address":bitcoinAddress},
                                "ethereum":{"privateKey":ethereumKey,"address":ethereumAddress}
                                }
                console.log(re)


		var privateKey = new bitcoin.PrivateKey();

		var exported = privateKey.toWIF();

		console.log(exported);


		var publicKey = privateKey.toPublicKey();
		var address = publicKey.toAddress("mainnet");
		console.log(address.toString())
