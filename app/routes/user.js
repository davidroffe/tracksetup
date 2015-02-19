var User = require('../models/user.js');

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
					email: user.email,
					avatar: user.avatar
				});
			}
		});
	}
};