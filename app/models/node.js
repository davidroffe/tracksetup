var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
	car: mongoose.Schema.Types.ObjectId,
	name  : String,
	message  : String
});

module.exports = mongoose.model('Note', carSchema);
