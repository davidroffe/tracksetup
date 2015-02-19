var mongoose = require('mongoose');

module.exports = mongoose.model('Card', {
	car: mongoose.Schema.Types.ObjectId,
	name: String,
	track: String,
	date: String,
	toe: {
		front: String,
		rear: String
	},
	camber: {
		frontLeft: String,
		frontRight: String,
		rearLeft: String,
		rearRight: String
	},
	caster: {
		left: String,
		right: String
	},
	spring: {
		rate: {
			frontLeft: String,
			frontRight: String,
			rearLeft: String,
			rearRight: String
		},
		length: {
			frontLeft: String,
			frontRight: String,
			rearLeft: String,
			rearRight: String
		}
	},
	shock: {
		pressure: {
			frontLeft: String,
			frontRight: String,
			rearLeft: String,
			rearRight: String
		},
		oneWay: {
			frontLeft: String,
			frontRight: String,
			rearLeft: String,
			rearRight: String
		},
		twoWay: {
			rebound: {
				frontLeft: String,
				frontRight: String,
				rearLeft: String,
				rearRight: String
			},
			compression: {
				frontLeft: String,
				frontRight: String,
				rearLeft: String,
				rearRight: String
			}
		},
		threeWay: {
			rebound: {
				frontLeft: String,
				frontRight: String,
				rearLeft: String,
				rearRight: String
			},
			compression: {
				highSpeed: {
					frontLeft: String,
					frontRight: String,
					rearLeft: String,
					rearRight: String
				},
				lowSpeed: {
					frontLeft: String,
					frontRight: String,
					rearLeft: String,
					rearRight: String
				}
			}
		},
		fourWay: {
			rebound: {
				highSpeed: {
					frontLeft: String,
					frontRight: String,
					rearLeft: String,
					rearRight: String
				},
				lowSpeed: {
					frontLeft: String,
					frontRight: String,
					rearLeft: String,
					rearRight: String
				}
			},
			compression: {
				highSpeed: {
					frontLeft: String,
					frontRight: String,
					rearLeft: String,
					rearRight: String
				},
				lowSpeed: {
					frontLeft: String,
					frontRight: String,
					rearLeft: String,
					rearRight: String
				}
			}
		}
	},
	cornerWeight: {
		frontLeft: String,
		frontRight: String,
		rearLeft: String,
		rearRight: String
	},
	swaybar: {
		front: String,
		rear: String
	},
	tire: {
		coldPressure: {
			frontLeft: String,
			frontRight: String,
			rearLeft: String,
			rearRight: String
		},
		hotPressure: {
			frontLeft: String,
			frontRight: String,
			rearLeft: String,
			rearRight: String
		}
	}
});