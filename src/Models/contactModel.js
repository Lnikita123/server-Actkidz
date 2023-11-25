const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    Email: {
      type: String,
      required: true,
    },
    ReEnteremail: {
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
module.exports = mongoose.model("Contact", contactSchema);
