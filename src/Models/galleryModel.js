const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
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
module.exports = mongoose.model("Gallery", gallerySchema);
