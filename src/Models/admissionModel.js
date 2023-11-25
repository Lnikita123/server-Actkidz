const mongoose = require("mongoose");
const admissionschema = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admission", admissionschema);
