var Web3 = require('web3');
var web3 = new Web3();
var fs = require('fs');
//var solc = require("solc");
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
		console.log("try1")
    		syncGo()
	}
	catch(err){
		console.log("catch1")
		syncGo()
	}
});
var initial = parseInt(process.argv[2]);
function syncGo(){
		try{
		console.log("try2") 
		console.log(initial)
                var request=new sql.Request();
                request.query("SELECT MAX(BlockNumber) FROM TransactionInfo WHERE [ChainName]='ETH'",function(err,result){
                        console.log(web3.eth.blockNumber)
                        result.recordset[0][""]=0
                        if(result.recordset[0][""]<parseInt(web3.eth.blockNumber)){
                        request.query("INSERT [TransactionInfo] ([TransactionInfo], [BlockNumber], [ChainName]) VALUES ('"+JSON.stringify(go(initial+parseInt(process.argv[3])))+"',"+(initial+parseInt(process.argv[3]))+",'ETH')")
			initial = initial+parseInt(process.argv[3]);
console.log(initial)
                        try{
			console.log("try3")
                                setTimeout(syncGo, 500);
                        }
                        catch(error){
			console.log("catch3")
                                setTimeout(syncGo, 500);
                        }
			//initial = initial+parseInt(process.argv[3]);
                        }
                        else{
				try{
				console.log("try4")
                                setTimeout(syncGo, 8000);
				}
				catch(error){
				console.log("catch4")
				setTimeout(syncGo, 8000);
				}
                        }
                });
		}
		catch(error){
			console.log("catch2")
                	setTimeout(syncGo, 8000);
                }
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
		try{
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
		catch(error){
		         console.log("final")
                        setTimeout(syncGo, 8000);
		}
	}
