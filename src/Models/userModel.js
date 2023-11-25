const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Mobile: {
      type: String,
    },
    Email: {
      type: String,
    },
    Qualifications: {
      type: String,
    },
    Experience: {
      type: String,
    },
    Resume: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
