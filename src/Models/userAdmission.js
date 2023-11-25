const mongoose = require("mongoose");

const userAdmissionSchema = new mongoose.Schema(
  {
    Parentname: {
      type: String,
    },
    Mobile: {
      type: String,
    },
    Email: {
      type: String,
    },
    Grade: {
      type: String,
      enum: ["Play school", "Primary School", "Pre-Primary School"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("UserAdmission", userAdmissionSchema);
