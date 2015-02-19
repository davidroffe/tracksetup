var User = require('../models/user.js');
var Car = require('../models/car.js');
var Card = require('../models/card.js');
var fs = require('fs');
var gm = require('gm');

module.exports = {
	getCar : function(req, res){
		var carId = req.param('carId');
		if(carId) {
			Car.findOne({_id:carId}, function(err, car){
				if(car) {
					res.json(car);
				} else {
					res.status(401);
					res.json({
						status: 401,
						message: 'Car does not exist'
					});
				}
			});
		} else {
			res.status(401);
			res.json({
				status: 401,
				message: 'Car does not exist'
			});
		}
	},
	getCars : function(req, res) {
		token = req.cookies.auth;
		User.findOne({token: token}, function(err, user) {
			if(user.cars.length) {
				Car.find({_id:{$in:user.cars}}, function(err, cars){
					res.json(cars);
				});
			} else {
				res.status(401);
				res.json({
					status: 401,
					message: "Not authorized"
				});
			}
		});
	},
	addCar : function(req, res) {
		token = req.cookies.auth;
		var newCarData = req.body;
		console.log('token is set to: ' + token);
		User.findOne({token: token}, function(err, user) {
			if(user){
				var newCar = new Car(newCarData);
				user.cars.push(newCar._id);
				newCar.save();
				user.save();
				console.log('newCar.id value is: ' + newCar._id);
				res.status(200).end();
			}
		});
	},
	addCard : function(req, res) {
		token = req.cookies.auth;
		var newCardData = req.body;
		var carId = req.param('carId');
		newCardData.date = formatDate(new Date());
		User.findOne({token: token}, function(err, user) {
			if(user){
				var newCard = new Card(newCardData);
				for(var i = 0; i < user.cars.length; i++) {
					console.log('car' + i + ' is ' + user.cars[i].name);
					if (user.cars[i]._id == carId) {
						user.cars[i].cards.push(newCard);
						user.markModified('cars');
					}
				}
				//console.log('The new card is: ' + car.cards[car.cards.length - 1].name);
				res.status(200).end();
			}
		});
	},
	upload: function(req, res) {
		Car.findOne({_id:req.param('carId')}, function(err, car){
			var path = './public/assets/img/car/';
			var fileBuffer = new Buffer('');
			var newFileName = (Math.random() * 100000000000000000).toString();
			var dirFiles = fs.readdirSync(path);

			while(dirFiles.indexOf(newFileName) !== -1){
				newFileName = (Math.random() * 100000000000000000).toString();
			}

			req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
				console.log('filename is: ' + filename);
				newFileName += ('.' + mimetype.slice(mimetype.indexOf('/') + 1, mimetype.length));
				var imageUrl = '/assets/img/car/' + newFileName;

				file.on('data', function(data){
					console.log('streaming data into buffer');
					fileBuffer = Buffer.concat([fileBuffer, data]);
				});

				file.on('end',function(){
					console.log('Manipulating image file');
					gm(fileBuffer, filename)
					.size(function(err, size){
						var x, y, tempSize;
						if(size.width > size.height) {
							x = size.width/2 - size.height/2;
							y = 0;

							this.crop(size.height, size.height, x, y);
						} else if (size.width < size.height) {
							x = 0;
							y = size.height/2 - size.width/2;

							this.crop(size.width, size.width, x, y);
						}

						this.resize(250)
						.write(path + newFileName, function(err){
							if(err){
								console.log(err);
								res.status(500);
								res.json({
									status:500,
									message: err
								});
							} else {
								console.log('Finished resizing image and saving.');
								fs.unlinkSync('./public' + car.avatar);
								console.log(car.avatar + 'has been deleted.');
								car.avatar = imageUrl;
								car.save();
								res.json(car);
							}
						});
					});
				});
				
			});
			req.pipe(req.busboy);
		});
	},
	editCar: function(req, res){
		var newData = req.body;
		var carId = req.param('carId');

		var query = Car.update({_id:carId},{$set:newData});

		query.exec();

		res.status(200).end();
	}
};

function findCar(user, carId){
	console.log('user email is: ' + user.email);
	console.log('carId is: ' + carId);
	for(var i = 0; i < user.cars.length; i++) {
		console.log('car' + i + ' is ' + user.cars[i].name);
		if (user.cars[i]._id == carId) {
			return user.cars[i];
		}
	}
	return false;
}

function formatDate(date) {
	var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var newDate = month[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
	
	console.log("The date for the card is: " + newDate);
}