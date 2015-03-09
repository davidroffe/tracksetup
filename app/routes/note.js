var Note = require('../models/note.js');
var Car  = require('../models/car.js');

module.exports = {
	getNotes: function(req, res){
		var carId = req.param('carId');

		Note.find({car:carId}, function(err, notes){
			if(notes) {
				console.log('Returning notes.');
				res.json(notes);
			} else {
				res.status(401);
				res.json({
					status: 401,
					message: "Invalid car or no notes"
				});
			}
		});
	},
	getNote: function(req, res){

	},
	addNote: function(req, res){
		console.log('addNote is running');
		var carId = req.param('carId');

		Car.findOne({_id: carId}, function(err, car){
			if(car) {
				console.log('Car found for notes');
				var newNote = new Note(req.body);

				newNote.car = carId;
				car.notes.push(newNote._id);

				newNote.save();
				car.save();
				console.log('Note added: ' + newNote.title);
				res.status(200).end();
			} else {
				res.status(401);
				res.json({
					status: 401,
					message: 'No car exists with that id.'
				});
			}
		});
	},

	delNotes: function(req, res){
		var notesToDel = req.body;
		var carId = req.param('carId');

		var query = Note.remove({_id:{$in: notesToDel}});

		query.exec();

		Car.findOne({_id: carId}, function(err, car){
			if(car){
				for(var i = 0; i < notesToDel.length; i++) {
					car.cards.splice(car.notes.indexOf(notesToDel[i]), 1);
				}

				car.save();
			}
		});

		res.status(200).end();
	}
};