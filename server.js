var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var configDB = require('./config/db.js');
var busboy = require('connect-busboy');

mongoose.connect(configDB.url);

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use(cookieParser('super.super.secret.shhh'));

app.use(logger('dev'));

app.use(busboy());

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

//app.use('/panel/*', function(req, res, next){
//	console.log(req.url);
//	next();
//});

app.use('/', require('./app/routes'));

app.listen(port);

console.log('Magic happens on ' + port);