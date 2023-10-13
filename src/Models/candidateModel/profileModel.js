const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;

const profileSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    trim: true,
  },
  candidateId: {
    type: ObjectId,
    ref: "SignUp",
    required: true,
    trim: true,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  profilePhoto: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  prefferedRole: {
    type: [String],
    trim: true,
  },
  allRoles : {
    type: [String],
    trim: true,
  },
  yearsOfExperience: {
    type: Number,
    trim: true,
  },
  summary: {
    type: String,
    trim: true,
  },
  expectedSalary : {
    type: String,
    trim: true,
  },
  workType : {
    type: [String],
    trim: true,
  },
  workLocation : {
    type: [String],
    trim: true,
  },
  workHistory: [Object],
  educationHistory: [Object],
  projects: [Object],
  softSkills: [String],
  domainSkills: [String],
  toolsAndTechnology: [String],
  available : {
    type : Boolean,
    default : true
  },
  jobsAppliedByCandidate: [
    {
      type: ObjectId,
      ref: "JobPost",
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  bookmarkedJobs: [
    {
      type: ObjectId,
      ref: "JobPost",
    },
  ],
});

const profileModel = mongoose.model("Profile", profileSchema);

module.exports = profileModel;
