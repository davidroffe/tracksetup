var jwt  = require('jwt-simple');
var User = require('../models/user.js');
//var secret = require('../../config/secret')();

var auth = {
	signUp: function(req, res) {
		//username = req.body.username || '';
		email = req.body.email || '';
		password = req.body.password || '';

		var emailRegEx = /[\w\.]+@[\w\.]+/;

		var errorRes = {
			status: 401,
			message: [] 
		};

		if (!(emailRegEx.test(email))){
			errorRes.message.push('Please enter a valid email.');
		}
		if(password === ''){
			errorRes.message.push('Please enter a password.');
		}
		console.log(errorRes.message[0]);
		if(errorRes.message.length > 0){
			res.status(401);
			res.json(errorRes);
		} else {
			User.findOne({'email': email}, function(err, user){
				if(user){
					errorRes.message.push('Sorry, that email is taken.');
					res.status(401),
					res.json(errorRes);
				} else {
					var newUser = new User();
					var token = genToken();

					newUser.email = email;
					newUser.password = newUser.generateHash(password);
					newUser.token = token;
					newUser.tokenDate = genExpDate();
					newUser.save();

					res.status(204);
					res.cookie('auth', token).end();
				}
			});
		}
	},
	login: function(req, res) {
		var email = req.body.email || '',
			password = req.body.password || '',
			emailRegEx = /[\w\.]+@[\w\.]+/;
			console.log('Email is: ' + email);
		if ( email === '' || !emailRegEx.test(email) || password === '' ) {
			res.status(401);
			res.json({
				"status": 401,
				"message": ["Invalid email or password"]
			});
		} else {
			User.findOne({'email' : email}, function(err, user){
				console.log('user from logging in is set to: ' + user);
				if (err) {
					res.status(401);
					res.json({
						"status": 401,
						"message": ["Error occurred in database"]
					});
				}else if (!user) {
					res.status(401);
					res.json({
						"status": 401,
						"message": ["Invalid email or password"]
					});
				}else if (user.validatePassword(password)) {
					var token = genToken();
					user.token = token;
					user.tokenDate = genExpDate();
					user.save();

					res.cookie('auth', token).end();

				} else {
					res.status(401);
					res.json({
						"status": 401,
						"message": ["Invalid email or password"]
					});
				}
			});

		}
	},
	logout: function(req, res){
		token = req.cookies.auth;
		User.findOne({token:token}, function(err, user){
			if(user){
				user.token = '';
				user.tokenDate = '';
				user.save();
				res.status(201).end();
			} else {
				res.status(401);
				res.json({
					status: 401,
					message: 'No user found for the given token'
				});
			}
		});
	},
	validateAuth: function(req, res, next) {
		var token = req.cookies.auth;
		var url = req.url;

		if(token && (url.indexOf('/assets') !== 0 || url.indexOf('/views') !== 0)){
			User.findOne({'token' : token}, function(err, user){
				console.log('Checking DB for user with token: ' + token);
				if(user){
					console.log('User with token found in DB...');
					//Check for expiration
					if(user.tokenDate <= Date.now()) {
						console.log('Token has expired, clearing token!');
						res.clearCookie('auth');
						user.token = '';
						user.tokenDate = '';
						user.save();
						
						if(url.indexOf('/panel') === 0){
							res.redirect('/');
						} else if (url.indexOf('/api') === 0) {
							res.status(401);
							res.json({
								status: 401,
								message: "Unauthorized"
							});
						} else {
							next();
						}
					} else {
						user.tokenDate = genExpDate();
						user.save();

						if(url === '/' || url === '/panel') {
							res.redirect('/panel/cars');
						} else {

							next();

						}
					}
				}else {
					console.log('No user found with that token; clearing token!');
					console.log('url is: ' + url);
					res.clearCookie('auth');
					
					if(url.indexOf('/panel') === 0){
						res.redirect('/');
					}else if(url.indexOf('/api') === 0) {
						res.status(401);
						res.json({
							status: 401,
							message: "Unauthorized"
						});
					} else {
						next();
					}
				}
			});
		} else {
			if(url.indexOf('/panel') === 0){
				console.log('No token, unauthorized access to: ' + url);
				res.redirect('/');
			} else if(url.indexOf('/api') === 0) {
				console.log('No token, unauthorized access to: ' + url);
				res.status(401);
				res.json({
					status: 401,
					message: "Unauthorized"
				});
			} else {
				next();
			}
		}
	}
}

//private functions
function genSecret(){
	var j = '';

	for(var i = 0; i < 4; i++){
		j = (Math.random() * 100000000000000000).toString() + j;
	}

	return j;
}

function genToken() {
	var j = '';

	for(var i = 0; i < 4; i++){
		j = (Math.random() * 100000000000000000).toString() + j;
	}

	return jwt.encode({seed:j}, genSecret());
}

function genExpDate(minutes){
	var dateObj = new Date();

	return dateObj.setMinutes(dateObj.getMinutes() + minutes);
}

function isExpired(token, secret){
	var tokenObject = jwt.decode(token, secret);

	if(tokenObject.exp > Date.now()){
		return false;
	} else {
		return true;
	}
}

module.exports = auth;