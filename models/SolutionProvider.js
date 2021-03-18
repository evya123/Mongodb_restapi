const mongoose = require('mongoose');

const SolutionProviderSchema = mongoose.Schema({
	Field: {
		type: String,
		required: true
	},
	AimedForNeed: {
		type: String,
		required: true
	},
	Cost: {
		type: Number,
		required: true
	},
	TechnicalDescription: {
		type: String,
		required: true
	},
	ImplementationDescription: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('SolutionProvider', SolutionProviderSchema);