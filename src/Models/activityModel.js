const mongoose = require("mongoose");
const activityschema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: false,
    },
    Heading: {
      type: String,
    },
    Description: {
      type: String,
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

module.exports = mongoose.model("Activity", activityschema);
