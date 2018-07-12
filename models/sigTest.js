const EthereumTx = require('ethereumjs-tx')
const privateKey = Buffer.from('0000000000000000000000000000000000000000000000000000000000000001', 'hex')

const txParams = {
  nonce: '0x01',
  gasPrice: '0x09184e72a000', 
  gasLimit: '0x2710',
  to: '0x0000000000000000000000000000000000000009', 
  value: '0x07', 
  data: '0x7f',
  // EIP 155 chainId - mainnet: 1, ropsten: 3
}

const tx = new EthereumTx(txParams)

console.log(tx.raw)
console.log(tx.raw.slice(0, 6))
//console.log(tx.hash(false))
tx.sign(privateKey)

const serializedTx = tx.serialize()
console.log(serializedTx.toString('hex'))

const rlp = require('rlp')

//console.log("123")
var rlpEncode = rlp.encode(tx.raw.slice(0, 6)).toString('hex')
console.log(rlpEncode)
var rlpEncodeBytes = rlp.encode(tx.raw.slice(0, 6))
const createKeccakHash = require('keccak')

console.log("Bytes:",rlpEncodeBytes)
//var tmp = "e2018609184e72a000822710940000000000000000000000000000000000000009077f";
console.log(Buffer.from("02","hex"))
var r = createKeccakHash('keccak256').update(Buffer.from(rlpEncodeBytes, 'hex' )).digest()
//var r = createKeccakHash('keccak256').update(rlpEncodeBytes).digest()
console.log("r:",r.toString("hex"));
const secp256k1 = require('secp256k1')

var s =secp256k1.sign(r, privateKey)
console.log(r.toString('hex'))
console.log(s.signature.slice(0, 32).toString('hex'))
console.log(s.signature.slice(32, 64).toString('hex'))


