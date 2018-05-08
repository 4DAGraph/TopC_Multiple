const Client = require('bitcoin-core');
const client = new Client({username: 'admin', password: 'password', network: 'testnet'})


const txHex = '0200000001999539009d0d02f2332d257716faa75cc4c9a8318c153ba6a084c719fa33103b000000006a4730440220032470b6b45825fc37d08e1985c7ad2044272edacfa2c76cf49c6b70c09a0dac02202466ede3e660c6d57f65b7ed21f2c1f778116ef92bef9ed2f9b18fcb1881a7b9012103b91ff254ae3bb3861e4a6c16ab356d6c52ccfd2b58bedf0dda84657dfd9d9afcffffffff0130750000000000001976a914ba05ece7632d78336848214b525cfdbd1c4b06a188ac00000000'

client.sendRawTransaction(txHex, (error, response) => {
  if (error) console.log(error);
  console.log(response);
});



