const mongoose = require('mongoose');

const NeedSpecificationsSchema = mongoose.Schema({
	AuthorityID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Authority',
		required: true
	},
	Field: {
		type: [String],
		required: true,
		default: []
	},
	Needs: {
		type: [String],
		required: true,
		default: []
	},
	ExpectedResult: {
		type: String,
		required: true
	},
	Budget: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('NeedSpecifications', NeedSpecificationsSchema);