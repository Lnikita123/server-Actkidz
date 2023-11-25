const mongoose = require("mongoose");

const formpopupSchema = new mongoose.Schema(
  {
    Childname: {
      type: String,
    },
    DateofBirth: {
      type: String,
    },
    Admission: {
      type: String,
      enum: [
        "Nursery",
        "LKG",
        "UKG",
        "Grade1",
        "Grade2",
        "Grade3",
        "Grade4",
        "Grade5",
      ],
    },
    Campus: {
      type: String,
      enum: ["Suchitra", "E Marredpally"],
    },
    CurrentSchool: {
      type: String,
    },
    Location: {
      type: String,
    },
    Fathernumber: {
      type: String,
    },
    Mothernumber: {
      type: String,
    },
    EmailId: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Form", formpopupSchema);
