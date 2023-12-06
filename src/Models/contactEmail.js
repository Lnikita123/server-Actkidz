const mongoose = require("mongoose");
const contactEmailSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    Email: {
      type: String,
      required: true,
    },
    Published: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ContactEmail", contactEmailSchema);
