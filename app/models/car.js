var mongoose = require('mongoose');

var carSchema = mongoose.Schema({
	avatar: String,
	name  : String,
	year  : Number,
	make  : String,
	model : String,
	cards : [mongoose.Schema.Types.ObjectId],
	notes : [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Car', carSchema);
