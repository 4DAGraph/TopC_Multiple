var Web3 = require('web3');

var web3 = new Web3();
                var nodeConnect = 'http://127.0.0.1:8545';
                web3.setProvider(new web3.providers.HttpProvider(nodeConnect));
                var data = [];
                var initial = 300008;
                var final = 300009;
                var dalength = 0;
                        main(initial)
                        function blockinfo(){
                                var blockinfo = web3.eth.getBlock(initial, true);
                                blockinfo.transactions.forEach(function(element){
                                        data.push(element);
                                        dalength = dalength +1;
					console.log(blockinfo.transactions.length)
					console.log(dalength)
                                if(dalength  === blockinfo.transactions.length) {
                                        dalength = 0;
                                        initial = initial +1
                                        console.log(initial)
                                        console.log(final)
                                        if(initial > final){console.log(data)}
                                        main()
                                }
                                });
                                //main(num)

                        }

                        function main(){

                                if(initial <=final){
                                        blockinfo();

                                }
                        }


                        //res.send(data);

         
