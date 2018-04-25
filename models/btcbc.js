const Client = require('bitcoin-core');
const client = new Client({host:'192.168.51.33',port:'8332' ,username: 'bitcoinrpc', password: 'bitcoinrpctest', network: 'regtest'})

const txHex = ''

client.sendRawTransaction(txHex, (error, response) => {
  if (error) console.log(error);
  console.log(response);
});
