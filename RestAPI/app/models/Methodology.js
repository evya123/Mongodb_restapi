const mongoose = require('mongoose');

const MethodologySchema = mongoose.Schema({
	Tools: {
		type: [String],
		required: true
	},
	Needs: {
		type: [String],
		required: true
	},
	Solutions: {
		type: [String],
		required: true
	},
	Constrains: {
		type: [String],
		required: true
	},
	ExpectedValue: {
		type: String,
		required: true
	},
	Description: {
		type: String,
		required: true,
		default: "Empty Description"
	}
});

module.exports = mongoose.model('Methodology', MethodologySchema);