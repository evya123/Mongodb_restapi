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
	}
});

module.exports = mongoose.model('BestPractice', BestPracticeSchema);