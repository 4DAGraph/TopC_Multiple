var Web3 = require('web3');
var web3 = new Web3();
var fs = require('fs');
var solc = require("solc");
var request = require('request');
var config = require('../config/default.js');
//var nodeConnect = config.nodeRpc;
//console.log(nodeConnect)
web3.setProvider(new web3.providers.HttpProvider("https://mainnet.infura.io/"));
var address = require("./address.json")
var sql=require('mssql');
//console.log(process.argv[3])
 var config={
    user:'ebc_admin',
    password:'B!tR2V6d',
    server:'192.168.51.150',   
    database:'ETHBlockChain'
 };
//setTimeout(function () {
sql.connect(config,function (err) {
//setTimeout(sync(), 8000);
	try{
    		sync()
	}
	catch(err){
		sync()
	}
});
var initial = parseInt(process.argv[2]);
function syncGo(){ 
                var request=new sql.Request();
                request.query("SELECT MAX(BlockNumber) FROM TransactionInfo",function(err,result){
                        //console.log(web3.eth.blockNumber)
                        if(result.recordset[0][""]<parseInt(web3.eth.blockNumber)){
                        request.query("INSERT [TransactionInfo] ([TransactionInfo], [BlockNumber], [ChainName]) VALUES ('"+JSON.stringify(go(initial+parseInt(process.argv[3])))+"',"+(initial+parseInt(process.argv[3]))+",'ETH')")
                        setTimeout(syncGo, 500);
			initial = initial+parseInt(process.argv[3]);
                        }
                        else{
                                setTimeout(sync, 8000);
                        }
                });
}

function sync(){ 
		var request=new sql.Request();
		request.query("SELECT MAX(BlockNumber) FROM TransactionInfo",function(err,result){
			//console.log(web3.eth.blockNumber)
			if(result.recordset[0][""]<parseInt(web3.eth.blockNumber)){
			request.query("INSERT [TransactionInfo] ([TransactionInfo], [BlockNumber], [ChainName]) VALUES ('"+JSON.stringify(go(result.recordset[0][""]+1))+"',"+(result.recordset[0][""]+1)+",'ETH')")
			setTimeout(sync, 500);
			}
			else{
				setTimeout(sync, 8000);
			}
		});
}

	//go(5000000);
	function go(blockNumber){
                var data = []
                        var blockinfo = web3.eth.getBlock(blockNumber, true);
                        blockinfo.transactions.forEach(function(element){
                        element.token = "eth"
                        if (element.value == 0){
                                if(element.input.substr(0,10) != "0xa9059cbb"){
                                        if(element.input.substr(34,40)){
                                                //console.log(element.to)
                                                element.to = "0x"+element.input.substr(34,40);
                                                //element.value = parseInt(element.input.substr(74,64),16).toString();
                                                element.value = parseInt(element.input.substr(74,64),16).toString();
                                        }
                                }
                        }
                        for(var a in address){
                                if(element.to == address[a]){
                                         if(element.input.substr(0,10) == "0xa9059cbb"){
                                                element.token = a;
                                                 element.to = "0x"+element.input.substr(34,40);
                                                element.value = parseInt(element.input.substr(74,64),16).toString();
                                                 //console.log(element)
                                                 //data.push(element);

                                        }
                                }
                        }

                                        data.push(element);
                        });
                        console.log("transactionList"+blockNumber/*+data*/);
			return data
                        //res.send(data);
                //}
	}
