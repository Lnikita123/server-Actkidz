const mongoose = require("mongoose");
const Pdfschema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    Heading: {
      type: String,
    },
    Description: {
      type: String,
    },
    Photo: {
      type: String,
    },
    Pdf: {
      type: String,
    },
    Month: {
      type: String,

      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    Year: {
      type: Number,
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

module.exports = mongoose.model("Pdf", Pdfschema);
