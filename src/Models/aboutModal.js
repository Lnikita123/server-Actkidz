const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    Photo: {
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
module.exports = mongoose.model("About", aboutSchema);
