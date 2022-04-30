const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const socialModel = mongoose.model("social", socialSchema);
module.exports = socialModel;
