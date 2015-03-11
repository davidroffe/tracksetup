var User = require('../models/user.js');
var Car  = require('../models/car.js');
var Card = require('../models/card.js');
var Note = require('../models/note.js');

module.exports = {
	userObject: function(req, res) {
		var token = req.cookies.auth;
		User.findOne({token: token}, function(err, user){
			if (!user) {
				res.status(401);
				res.json({
					status: 401,
					message: "User does not exist"
				});
			} else {
				res.json({
					_id: user._id,
					email: user.email,
					avatar: user.avatar
				});
			}
		});
	},
	
	updateEmail: function(req, res){
		var token = req.cookies.auth;
		var newEmail = req.body.email;
		var emailRegEx = /[\w\.]+@[\w\.]+/;
		
		if(!emailRegEx.test(newEmail)){
			res.status(409);
			res.json({
				status: 409,
				message: 'Not a valid email.'
			});
		} else {
			console.log('New email is: ' + newEmail);

			User.findOne({token:token}, function(err, user){
				if (!user) {
					res.status(401);
					res.json({
						status: 401,
						message: "User does not exist"
					});
				} else {
					user.email = newEmail;
					user.save();
					res.status(200).end();
				}
			});
		}
	},
	
	updatePass: function(req, res){
		var token = req.cookies.auth;
		var newPassword = req.body.password;
		
		console.log('New password is: ' + newPassword);

		User.findOne({token:token}, function(err, user){
			if (!user) {
				res.status(401);
				res.json({
					status: 401,
					message: "User does not exist"
				});
			} else {
				user.password = user.generateHash(newPassword);
				user.save();
				res.status(200).end();
			}
		});
	},
	
	deleteAccount: function(req, res){
		var token = req.cookies.auth;
		
		User.findOne({token:token}, function(err, user){
			if (!user) {
				res.status(401);
				res.json({
					status: 401,
					message: "User does not exist"
				});
			} else {
				Note.remove({car:{$in: user.cars}},function(){});
				Card.remove({car:{$in: user.cars}},function(){});
				Car.remove({user: user._id},function(){});
				User.remove({token:token},function(){});
				
				res.status(200).end();
			}
		});
	}
};