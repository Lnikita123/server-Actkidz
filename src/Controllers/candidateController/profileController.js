const profileModel = require("../../Models/candidateModel/profileModel");
const SignUpModel = require("../../Models/signUpModel");
const { ObjectId } = require("mongoose").Types;
const shortid = require("shortid");



let generateUniqueId = () => {
  return shortid.generate();
};

const createProfile = async function (req, res) {
  try {
    let randomNo = Math.floor(Math.random() * 9000000000) + 1000;

    let ID = `CON${randomNo}${generateUniqueId()}`;
    let data = req.body;
    const {
      candidateId,
      name,
      prefferedRole,
      allRoles,
      expectedSalary,
      workType,
      workLocation,
      available,
      yearsOfExperience,
      summary,
      workHistory,
      educationHistory,
      projects,
      softSkills,
      domainSkills,
      toolsAndTechnology,
    } = data;

    const candidate = await SignUpModel.findOne({
      _id: new ObjectId(candidateId),
    });
    if (!candidate) {
      return res.status(404).send({ message: "candidate not found" });
    }

   

    if (candidate.accountType != "Candidate") {
      return res
        .status(400)
        .send({ message: "Only candidates can create this profile" });
    }

    const newProfile = new profileModel({
      uniqueId: ID,
      candidateId,
      name: candidate?.firstName + " " + candidate?.lastName,
      country: candidate.country,
      city: candidate.city,
      prefferedRole,
      yearsOfExperience,
      summary,
      allRoles,
      expectedSalary,
      workType,
      workLocation,
      available,
      workHistory,
      educationHistory,
      projects,
      softSkills,
      domainSkills,
      toolsAndTechnology,
      profilePhoto: candidate.profilePhoto,
    });
    const savedProfile = await newProfile.save();
    res.status(201).send(savedProfile);
  } catch (error) {
    console.log(error);
  }
};

const getAllProfiles = async function (req, res) {
  try {
    const profiles = await profileModel.find({});
    res.status(200).send(profiles);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const getProfileById = async function (req, res) {
  try {
    const candidateId = req.params.candidateId;
    const profile = await profileModel.findOne({ candidateId });
    if (!profile) {
      return res.status(404).send({ message: "Profile not found" });
    }
    res.status(200).send(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { createProfile, getAllProfiles, getProfileById };
