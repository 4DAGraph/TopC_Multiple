var express = require('express');
var router = express.Router();
var chainAPI = require('../models/chainAPI');
var signAPI = require('../models/signAPI');
var testAPI = require('../testAPI/APIToTest');

var APIToTestRpcTest = require('../testAPI/APIToTestRpcTest')
///測試專用
router.get("/txDecode/:tx",chainAPI.txDecode);
//btc

router.get("/btcunspend/:address",chainAPI.btcunspend);

//BYB_sign
router.post("/BYBsign/:from/:to/:value/:key",chainAPI.BYB_sign);
router.post("/testTxOut",testAPI.txout);

router.post("/testTxOut2/:from/:to/:value/:key",APIToTestRpcTest.txout);

router.post("/autoBroadCast/:from/:key/:tx",APIToTestRpcTest.autoBroadCast);
///簽章專用

router.post("/keyCryptoTx",signAPI.keyCryptoTx);
router.post("/key1store",signAPI.key1store);
router.post("/key2store",signAPI.key2store);
router.post("/key3store",signAPI.key3store);
router.post("/key4store",signAPI.key4store);
router.post("/key5store",signAPI.key5store);
router.post("/keyStore_publish",signAPI.keyStore_publish);
router.post("/keyStore_publishV2",signAPI.keyStore_publishV2);
router.post("/keyResult",signAPI.keyResult);
router.post("/keyCombine",signAPI.keyCombine);
router.post("/keyStore_checkKey",signAPI.keyStore_checkKey);
router.post("/keyDelete",signAPI.keyDelete);
///簽章end

router.post("/newSign/:to/:gasLimit/:nonce/:value/:gasPrice",chainAPI.newSign);
router.post("/newSignAll/:privateKey/:rawtx",chainAPI.newSignAll);


router.get("/transactionTokenListRange/:token/:initialBlock/:finalBlock",chainAPI.transactionTokenListRange);
router.post("/HC_signTokenInformationIn/:token/:to/:gasLimit/:nonce/:value/:gasPrice",chainAPI.HC_signTokenInformationIn);
router.get("/getTokenBalance/:token/:address",chainAPI.getTokenBalance);
router.get("/transactionTokenReceipt/:address",chainAPI.transactionTokenReceipt);

router.get("/deploy_contract/:account/:password",chainAPI.deploy_contract);
router.get("/sendTransaction/:from/:password/:to/:balance",chainAPI.sendTransaction);
router.get("/receiveTransaction/:transaction",chainAPI.receiveTransaction);
//result formate 
router.get("/call_constant",chainAPI.call_constant);
router.post("/HC_signInformationIn/:to/:gasLimit/:nonce/:value/:gasPrice",chainAPI.HC_signInformationIn);
//127.0.0.1:3200/topChain/HC_signInformationIn/0x6a2f20a64dc0f784195db570ac14b2d2359fdb88/210000/26/1
router.post("/CC_signInformation/:privateKey/:rawtx",chainAPI.CC_signInformation);
//127.0.0.1:3200/topChain/CC_signInformation/0f71788cb20ad6e4fce227271954be9ed09c619e06f60ad9781fa614f989d7fb/{"nonce": "0x1e","gas": "0x33450","gasLimit": "0x493e0","to": "0x6a2f20a64dc0f784195db570ac14b2d2359fdb88","value": 1}
router.post("/HC_signInformationOut/:serializedTx",chainAPI.HC_signInformationOut);
//127.0.0.1:3200/topChain/HC_signInformationOut/f8601e8083033450946a2f20a64dc0f784195db570ac14b2d2359fdb8801801ca0b985504c5a7bd672efb5722ad660aa665ab42a157e1807b4b0874c7de69007d5a0515e60f108951c85c835fd1033e83d4bd7a4a50a2582d6b324ee32c2f8d8a37d

router.get("/transactionCount/:address",chainAPI.transactionCount);
router.get("/transactionReceipt/:address",chainAPI.transactionReceipt);

router.get("/transaction/:address",chainAPI.transaction);

router.get("/checkTransactionResult",chainAPI.key_publish);
//f27e74d12f75129ed3f8fa059dcc6a430420277775138ea8ccaadd9262c642a1
router.get("/key_publish/:amounts",chainAPI.key_publish);
//f27e74d12f75129ed3f8fa059dcc6a430420277775138ea8ccaadd9262c642a1
//0f71788cb20ad6e4fce227271954be9ed09c619e06f60ad9781fa614f989d7fb
router.get("/keyStore_publish",chainAPI.keyStore_publish);

//key exports formate [{address:$,publicKey:$,privateKey:$}]
router.get("/blockNumber",chainAPI.blockNumber);
//127.0.0.1:3200/topChain/blockNumber
router.get("/transactionList/:blockNumber",chainAPI.transactionList);
//127.0.0.1:3200/topChain/transactionList/4000000

router.get("/transactionListRange/:initialBlock/:finalBlock",chainAPI.transactionListRange);
//192.168.51.202:3200/topChain/transactionListRange/4000000/4000010
router.get("/getBalance/:address",chainAPI.getBalance);
//change to post
//127.0.0.1:3200/topChain/getBalance/0x1c2d9e39cdd9a8a57422dc1be6ec9737595ae49f


router.get("/transactionList_to/:blockInitial/:blockFinal/:address",chainAPI.transactionList_to);

router.get("/transactionList_from/:blockInitial/:blockFinal/:address",chainAPI.transactionList_from);

module.exports = router;
