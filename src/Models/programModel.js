const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    Heading: {
      type: String,
    },
    Age: {
      type: String,
    },
    Description: {
      type: String,
    },
    Photos: {
      type: [String],
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
module.exports = mongoose.model("Program", programSchema);
