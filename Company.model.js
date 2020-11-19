const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Company = Schema({
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
  units: [
    {
      type: Schema.Types.ObjectId,
      ref: "Unit",
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Company", Company);
