const mongoose = require("mongoose");

const userHomeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    Name: {
      type: String,
    },
    Phone: {
      type: String,
    },
    Query: {
      type: String,
    },
    Published: {
      type: Boolean,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("UserHome", userHomeSchema);
