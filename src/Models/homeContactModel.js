const mongoose = require("mongoose");
const homecontactSchema = new mongoose.Schema(
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
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Homecontact", homecontactSchema);
