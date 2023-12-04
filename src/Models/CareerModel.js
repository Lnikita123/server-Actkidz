const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: false,
    },
    Photos: {
      type: String,
    },
    Link: {
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

module.exports = mongoose.model("Career", careerSchema);
