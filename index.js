var path = require('path');
var express = require('express');
var session = require('express-session');
var flash = require('connect-flash');
var config = require('./config/default');
var routes = require('./routes');
var pkg = require('./package');
var app = express();

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

routes(app);

app.use(function (err, req, res, next) {
  res.render('error', {
    error: err
  });
});

app.set('port', config.port);

var cluster = require('cluster');
var http = require('http');
var numCPUs = process.argv[2] || require('os').cpus().length;
if (cluster.isMaster) {
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('listening', (worker, address) => {
		console.log('worker ' + worker.process.pid +', listen: '+address.address+":"+address.port);
	});
	cluster.on('exit', (worker, code, signal) => {
		console.log('worker ' + worker.process.pid + ' died');
//		cluster.fork();
	});
} else {
	app.listen(app.get('port'));
}

/*
if (module.parent) {
  module.exports = app;
} else {
  app.listen(config.port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`);
  });
}
*/
