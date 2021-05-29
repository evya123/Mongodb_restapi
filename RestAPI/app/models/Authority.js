const mongoose = require("mongoose");
const NeedSpecifications = require("./../models/NeedSpecifications.js");

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
    type: String,
    default: "",
  },
  Budget: {
    type: Number,
    default: 0,
  },
});

const ContactSchema = mongoose.Schema({
  _id: false,
  First_Name: {
    type: String,
    required: true,
  },
  Last_Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  },
});

const AuthoritySchema = mongoose.Schema({
  Authority: {
    type: String,
    required: true,
    unique: true,
  },
  Contact: ContactSchema,
  Population: {
    type: Number,
    required: true,
  },
  Area: {
    type: Number,
    required: true,
  },
  MedianAge: {
    type: Number,
    required: true,
  },
});

AuthoritySchema.post("save", async function (doc, next) {
  console.log("Authority save post action");
  try {
    const ns = new NeedSpecifications({
      AuthorityID: doc._id,
    });
    console.log("Created ns, saving now.");
    ns.save(async (err) => {
      if (err) {
        console.log("ns save error", err);
        next(err);
      }
    });
    console.log("Saved default ns");
  } catch (err) {
    console.log("post save error", err);
    next(err);
  }
});

AuthoritySchema.pre("deleteOne",{ document: true, query: false }, async function (next) {
  console.log("Authority deleteone pre action");
  console.log("Trying to delete ns");
  try {
    await NeedSpecifications.findOneAndDelete({ AuthorityID: this._id });
  } catch (err) {
    console.log("pre deleteone error", err);
    next(err);
  }
  console.log("ns deleted");
});

module.exports = mongoose.model("Authority", AuthoritySchema);
