# EthereumTrading

requirement:
```
1.geth(default:rpcport-8545, api-[admin,eth,personal,net])
2.node version 6.0 up
```

initiation process:
```javascript
node index.js
```

Basic useful api:

 * topChain/sendTransaction/:from/:password/:to/:balance send balance in ethereum based on wei unit
 	
 * topChain/key_publish/:password/:amounts
 



example:

```
topChain/sendTransaction/:from/:password/:to/:balance
topChain/sendTransaction/8a08fb7d28f2ed240a6fb06b3ae4f107fa320b91/123/8a08fb7d28f2ed240a6fb06b3ae4f107fa320b92/10
//send 10 wei from 8a08fb7d28f2ed240a6fb06b3ae4f107fa320b91 to 8a08fb7d28f2ed240a6fb06b3ae4f107fa320b92

topChain/key_publish/:password/:amounts
topChain/key_publish/123/10
//export 10 accounts
//export formate:[{address:$,publicKey:$,privateKey:$,salt:$,iv:$}]

{"address":"0x42cc0b9b002c9af904bd82883eba7a82ac7906ee",
"publicKey":"0x42b8ce3934d147d3582eb28905efd481f7270aa4637944111bc47fe4c5e2bba507834448fdd78c66bb20caa0c3541e4199989fed9710576c6d683c066332226c",
"privateKey":"91fbd8aadd9b300abfa78e5f8588c167d5e00262387769863aed8976202b1936",
"salt":"93ebb444aad608b36e3d7b5993a394d5ec1e628d8321971348497059188528d6",
"iv":"5926c5a7e166290cf69c8e3b1cbcba01"}
```

