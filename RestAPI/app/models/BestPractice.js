const mongoose = require('mongoose');

const BestPracticeSchema = mongoose.Schema({
	Solution: {
		type: String,
		required: true
	},
	Authority: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Authority',
		required: true
	},
	Result: {
		type: String
	},
	Problems: {
		type: String
	},
	Method: {
		type: String
	},
	Suitability: {
		type: String
	},
	Provider: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Provider',
		required: true
	}
});

module.exports = mongoose.model('BestPractice', BestPracticeSchema);