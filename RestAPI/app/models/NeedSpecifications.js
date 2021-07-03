const mongoose = require("mongoose");
const NeedSpecificationsSchema = mongoose.Schema({
  AuthorityID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Authority",
    required: true,
  },
  Field: {
    type: [String],
    default: [],
  },
  Needs: {
    type: [String],
    default: [],
  },
  ExpectedResult: {
    type: [String],
    default: [],
  },
    Budget: {
    type: [Number],
    default: [],
  },
});

module.exports = mongoose.model("NeedSpecifications", NeedSpecificationsSchema);
