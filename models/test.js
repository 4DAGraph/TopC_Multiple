var bitcoin = require('bitcore-lib')

		var privateKey = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
		
		if(privateKey.length!=64){
                var bitcoinprivateKey = new bitcoin.PrivateKey(privateKey);
                //var bitcoinAddress = bitcoinprivateKey.toAddress().toString();
                var bitcoinKey = bitcoinprivateKey.toString()
		console.log(bitcoinKey)
		}
