module.exports = function(){
	var j;
	for(var i = 0; i < 4; i++){
		j = (Math.random() * 100000000000000000).toString() + j;
	}
	return j;
};