var Web3 = require('web3');
var web3 = new Web3();
var bodyParser = require('body-parser');
web3.setProvider(new web3.providers.HttpProvider('http://localhost:1111')); 

module.exports = function (app) {

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(bodyParser.json());

  app.get('/', function (req, res) {

  });


  app.use('/topChain', require('./topChain'));


  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.render('404');
    }
  });
};
