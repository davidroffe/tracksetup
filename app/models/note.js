var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
	car: mongoose.Schema.Types.ObjectId,
	title   : String,
	message : String
});

module.exports = mongoose.model('Note', noteSchema);
