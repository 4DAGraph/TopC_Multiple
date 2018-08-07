var path = require('path');
var express = require('express');
var session = require('express-session');
var flash = require('connect-flash');
var config = require('./config/default');
var routes = require('./routes');
var pkg = require('./package');
var app = express();

var RateLimit = require('express-rate-limit');

app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
/*
var apiLimiter = new RateLimit({
  windowMs: 1*1000, // 15 minutes
  max: 3,
  delayMs: 0 // disabled
});
app.use('/topchain', apiLimiter);

var apiblock = new RateLimit({
  windowMs: 3*1000, // 15 minutes
  max: 1,
  delayMs: 3000 // disabled
});

app.use('/topchain/blockNumber', apiblock);
*/
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

routes(app);

/*app.use(function (err, req, res, next) {
  res.render('error', {
    error: err
  });
});*/

app.use(function (err, req, res, next) {
        //console.error(err.stack)
        res.status(500).send({"error":"error parameter","status":"1","message":err.stack})
})

app.set('port', config.port);

var cluster = require('cluster');
var http = require('http');
var numCPUs = process.argv[2] || require('os').cpus().length;
if (cluster.isMaster) {
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('listening', (worker, address) => {
		//console.log('worker ' + worker.process.pid +', listen: '+address.address+":"+address.port);
	});
	cluster.on('exit', (worker, code, signal) => {
		//console.log('worker ' + worker.process.pid + ' died');
		cluster.fork();
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
