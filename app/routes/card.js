var User = require('../models/user.js');
var Car  = require('../models/car.js');
var Card = require('../models/card.js');

module.exports = {
	getCard: function(req, res){
		var token = req.cookies.auth;
		var cardId = req.param('cardId');
		
		Card.findOne({_id:cardId}, function(err, card){
			if(card){
				res.json(card);
			} else {
				res.status(401);
				res.json({
					status:401,
					message:"Card does not exist"
				});
			}
		});
	},
	getCards : function(req, res) {
		var token = req.cookies.auth;
		var carId = req.param('carId');

		Car.findOne({_id: carId}, function(err, car) {
			if (car) {
				Card.find({_id:{$in:car.cards}}, function(err, cards){
					res.json(cards);
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
	addCard: function(req, res){
		var carId = req.param('carId');
		var card = req.body;

		console.log('new card is: ' + card);
		
		Car.findOne({_id: carId}, function(err, car) {
			if (car) {
				var dateString = new Date();
				dateString = dateString.toDateString();
				dateString = dateString.slice(4, dateString.length);

				var newCard = new Card(card);
				newCard.car = carId;
				newCard.date = dateString;
				
				newCard.save();
				
				car.cards.push(newCard._id);
				car.save();
				
				res.status(200).end();
			} else {
				res.status(401).end();
			}
		});
	},

	delCards: function(req, res){
		var cardsToDel = req.body;
		var carId = req.param('carId');

		var query = Card.remove({_id:{$in: cardsToDel}});

		query.exec();

		Car.findOne({_id: carId}, function(err, car){
			if(car){
				for(var i = 0; i < cardsToDel.length; i++) {
					car.cards.splice(car.cards.indexOf(cardsToDel[i]), 1);
				};

				car.save();
			}
		});

		res.status(200).end();
	},

	editCard: function(req, res){
		var cardId = req.param('cardId');
		var newData = req.body;

		Card.findOne({_id:cardId}, function(err, card){
			if(card){
				card.update(newData, function(err, numbAffected, raw){});
			}
			res.json(card);
		});
	}
};