const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Asset = Schema({
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
  image: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: "Unit",
    required: true,
  },
});

module.exports = mongoose.model("Asset", Asset);
