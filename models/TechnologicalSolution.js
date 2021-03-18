const mongoose = require('mongoose');

const TechnologicalSolutionSchema = mongoose.Schema({
	Solution: {
		type: String,
		required: true
	},
	SolutionProvider: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SolutionProvider',
		required: true
	},
	ImplementationSystem: {
		type: String,
		required: true
	},
	Budget: {
		type: Number,
		required: true
	},
	Effect: {
		type: String,
		required: true
	},
	Constrains: {
		type: String,
		required: true
	},
	NeededWrapper: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('TechnologicalSolution', TechnologicalSolutionSchema);