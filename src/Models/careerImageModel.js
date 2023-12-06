const mongoose = require("mongoose");

const careerImageSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    Photos: {
      type: [
        {
          id: String,
          image: String,
        },
      ],
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
module.exports = mongoose.model("CareerImage", careerImageSchema);
