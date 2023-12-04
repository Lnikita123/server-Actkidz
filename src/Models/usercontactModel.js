const mongoose = require("mongoose");

const userContactSchema = new mongoose.Schema(
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
    Email: {
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
module.exports = mongoose.model("UserContact", userContactSchema);
