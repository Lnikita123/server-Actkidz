const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: false,
    },
    Description: {
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

module.exports = mongoose.model("fee", feeSchema);
