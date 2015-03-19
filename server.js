var express      = require('express');
var forceSSL     = require('express-force-ssl');
var http         = require('http');
var https        = require('https');
var app          = express();
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose     = require('mongoose');
var port         = process.env.PORT || 443;
var configDB     = require('./config/db.js');
var httpsOptions = require('./config/https.js');
var busboy       = require('connect-busboy');

mongoose.connect(configDB.url);

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use(cookieParser('super.super.secret.shhh'));

app.use(logger('dev'));

app.use(busboy());

app.use(forceSSL);

app.all("/*", function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'preview.track-setup.com');
	res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	if(req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

app.use('/', require('./app/routes'));

var httpServer = http.createServer(app);
var httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(port);
httpServer.listen(80);

console.log('Magic happens on ' + port);
console.log('Redirecting everything on port 80 to port ' + port);