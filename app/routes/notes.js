var Notes = require('./notes.js');

module.exports = {
	getNotes: function(req, res){
		var carId = req.param('carId');

		Notes.find({car:carId}, function(err, notes){
			if(notes) {
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
		var carId = req.param('carId');

		Car.findOne({_id: carId}, function(err, car){
			if(car) {
				var newNote = new Notes(req.body);

				newNote.car = carId;
				car.notes.push(newNote._id);

				newNote.save();
				car.save();
			}
		})
		


	}
};