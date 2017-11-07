var Web3 = require('web3');

var web3 = new Web3();
                var nodeConnect = 'http://127.0.0.1:8545';
                web3.setProvider(new web3.providers.HttpProvider(nodeConnect));
                var data = [];
                var initialBlock = 4000001;
                var finalBlock = 4000003;

		var a=0;
			for(var leng=initialBlock;leng<=finalBlock;leng++){
                        	//console.log(leng)
				var blockinfo = web3.eth.getBlock(leng, true);
				a = a+blockinfo.transactions.length;
                        	blockinfo.transactions.forEach(function(element){
                                	data.push(element);
					console.log(a);
					console.log(data.length)
					if(leng == finalBlock&&data.length == a){
					console.log(data)
					}
                        	});
			}
