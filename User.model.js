const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (input) {
        return input.length >= 4 && input.length <= 40;
      },
      message: "Must be between 4 and 40 characters",
    },
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  assets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Asset",
    },
  ],
});

module.exports = mongoose.model("User", User);
