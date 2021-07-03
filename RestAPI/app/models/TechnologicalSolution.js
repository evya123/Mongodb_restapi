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
		default: ""
	},
	Budget: {
		type: Number,
		default: 0
	},
	Effect: {
		type: String,
		default: ""
	},
	Constrains: {
		type: String,
		default: ""
	},
	NeededWrapper: {
		type: String,
		default: ""
	}
});

module.exports = mongoose.model('TechnologicalSolution', TechnologicalSolutionSchema);