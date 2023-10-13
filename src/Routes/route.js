const express = require("express");
const passport = require("passport");
const { signUp, verifyEmail } = require("../Controllers/signUpController");
const { forgotPassword } = require("../Controllers/forgotPassword");
const { signOut } = require("../Controllers/signOutController");

const {
  userProfile,
  getUserAccount,
} = require("../Controllers/userAccountController");
const { signIn } = require("../Controllers/signInController");

const {
  createProfile,
  getAllProfiles,
  getProfileById,
} = require("../Controllers/candidateController/profileController");
const {
  createTask,
} = require("../Controllers/candidateController/calenderController");
const {
  createCompanyProfile,
  getCompanyProfile,
} = require("../Controllers/recruiterController/companyController");
const {
  createJobPost,
  candidatesWhoHasAppliedToJob,
} = require("../Controllers/recruiterController/jobPostsController");
const {
  storeProfilePhoto,
} = require("../Controllers/candidateController/profilePhotoController");

// const {storeRecruiterProfilePhoto} = require("../Controllers/recruiterController/recruiterProfilePhotoController")
// const {
//   recruiterCompanyInfo,
// } = require("../Controllers/recruiterController/recruiterCompanyController");

const {
  getJob,
  getAllJobs,
} = require("../Controllers/recruiterController/getJobs");

const {
  adminProfile,
} = require("../Controllers/adminController/adminAccountController");

const {
  createAdminCompanyProfile,
} = require("../Controllers/adminController/createAdminCompanyProfile");

const { allJobs } = require("../Controllers/adminController/allJobs");
const { singleJob } = require("../Controllers/adminController/singleJob");
const {
  updateJobPost,
} = require("../Controllers/adminController/updateJobPost");
const {
  deleteJobPost,
} = require("../Controllers/adminController/deleteJobPost");
const {
  bookmarkJobForAdmin,
  bookmarkedJobsByAdminInfo,
} = require("../Controllers/adminController/bookmarkJob");
const { createJob } = require("../Controllers/adminController/createJobPost");
const {
  allCandidates,
} = require("../Controllers/adminController/allCandidates");
const {
  updateCandidateProfile,
} = require("../Controllers/adminController/updateCandidateProfile");
const {
  deleteCandidateProfile,
} = require("../Controllers/adminController/deleteCandidateProfile");
const {
  bookmarkCandidateProfileByAdmin,
  ShowbookmarkedCandidateProfilesByAdmin,
} = require("../Controllers/adminController/bookmarkCandidateProfile");
const {
  createCandidateProfile,
} = require("../Controllers/adminController/createCandidateProfile");
const {
  allCompanies,
} = require("../Controllers/adminController/allCompanyProfiles");

const {
  singleCompany,
} = require("../Controllers/adminController/singleCompanyProfile");

const {
  updateCompany,
} = require("../Controllers/adminController/updateCompanyProfile");

const {
  deleteCompanyProfile,
} = require("../Controllers/adminController/deleteCompanyProfile");

const {
  bookmarkCompanyProfileByAdmin,
  showBookmarkedCompanyProfilesByAdmin,
} = require("../Controllers/adminController/bookmarkCompanyProfile");

const {
  applyToJob,
  appliedJobsInfo,
  bookmarkJobPost,
  bookmarkedJobsInfo,
} = require("../Controllers/candidateController/applyToJob");
const { currentUser } = require("../Auth/currentUser");
const { requireAuthorization } = require("../Auth/authorization");
const { userType } = require("../userType/types");
const {
  messages,
  candidateMessage,
  recruiterMessage,
  getMessages,
  postMessage,
} = require("../Controllers/messagesController");

const router = express.Router();

// router.get("/test", async(req,res)=>{
//     return res.send("success")
// })

router.post("/signUp", signUp);

router.get("/verifyEmail", verifyEmail);

router.post("/forgotPassword", forgotPassword);

router.post("/messages/:senderId", postMessage);
router.get("/messages/:receiverId", getMessages);
router.get("/candidateMessage/:candidateId", candidateMessage);
router.get("/recruiterMessage/:recruiterId", recruiterMessage);

router.put(
  "/updateUser/:candidateId",
  currentUser,
  requireAuthorization([
    userType.CONNECTING_RECRUITER,
    userType.CONNECTING_CANDIDATE,
  ]),
  userProfile
);

router.post("/signIn", signIn);

router.post("/signout", signOut);

router.post(
  "/createProfile",
  currentUser,
  requireAuthorization([
    userType.CONNECTING_ADMIN,
    userType.CONNECTING_CANDIDATE,
  ]),

  createProfile
);

router.get(
  "/getAllProfiles",

  getAllProfiles
);

router.get(
  "/getProfileById/:candidateId",
  currentUser,
  requireAuthorization([
    userType.CONNECTING_RECRUITER,
    userType.CONNECTING_CANDIDATE,
    userType.CONNECTING_ADMIN,
  ]),
  getProfileById
);

router.get(
  "/userAccount/:userId",
  currentUser,
  requireAuthorization([
    userType.CONNECTING_RECRUITER,
    userType.CONNECTING_CANDIDATE,
  ]),

  getUserAccount
);

router.post(
  "/calenderEvent/:candidateId",
  currentUser,
  requireAuthorization([userType.CONNECTING_RECRUITER]),
  createTask
);

router.post(
  "/companyProfile/:recruiterId",
  currentUser,
  requireAuthorization([
    userType.CONNECTING_ADMIN,
    userType.CONNECTING_RECRUITER,
  ]),
  createCompanyProfile
);

router.get(
  "/getCompanyProfile/:recruiterId",
  currentUser,
  requireAuthorization([
    userType.CONNECTING_RECRUITER,
    userType.CONNECTING_CANDIDATE,
    userType.CONNECTING_ADMIN,
  ]),
  getCompanyProfile
);

router.post(
  "/createJob",
  currentUser,
  requireAuthorization([
    userType.CONNECTING_RECRUITER,
    userType.CONNECTING_ADMIN,
  ]),
  createJobPost
);

router.post(
  "/savePhoto/:candidateId",
  currentUser,
  requireAuthorization([
    userType.CONNECTING_RECRUITER,
    userType.CONNECTING_CANDIDATE,
    userType.CONNECTING_ADMIN,
  ]),
  storeProfilePhoto
);

router.get(
  "/getJob/:recruiterId",
  currentUser,
  requireAuthorization([
    userType.CONNECTING_RECRUITER,
    userType.CONNECTING_CANDIDATE,
    userType.CONNECTING_ADMIN,
  ]),
  getJob
);

router.get(
  "/getAllJobs",

  getAllJobs
);

router.post(
  "/admin",
  currentUser,
  requireAuthorization([userType.CONNECTING_ADMIN]),
  adminProfile
);

router.get(
  "/allJobs/:adminId",
  currentUser,
  requireAuthorization([userType.CONNECTING_ADMIN]),
  allJobs
);

router.get(
  "/singleJob/:jobPostId",
  currentUser,
  requireAuthorization([
    userType.CONNECTING_RECRUITER,
    userType.CONNECTING_CANDIDATE,
    userType.CONNECTING_ADMIN,
  ]),
  singleJob
);

router.put(
  "/updateJob/:jobPostId",
  currentUser,
  requireAuthorization([
    userType.CONNECTING_RECRUITER,
    userType.CONNECTING_ADMIN,
  ]),
  updateJobPost
);

router.delete(
  "/deleteJobPost/:jobPostId",
  currentUser,
  requireAuthorization([
    userType.CONNECTING_RECRUITER,
    userType.CONNECTING_ADMIN,
  ]),
  deleteJobPost
);

router.put(
  "/bookmarkJobForAdmin/:adminId",
  currentUser,
  requireAuthorization([userType.CONNECTING_ADMIN]),
  bookmarkJobForAdmin
);

router.get(
  "/bookmarkedJobsByAdminInfo/:adminId",
  currentUser,
  requireAuthorization([userType.CONNECTING_ADMIN]),
  bookmarkedJobsByAdminInfo
);

router.post(
  "/createJobPost",
  currentUser,
  requireAuthorization([
    userType.CONNECTING_RECRUITER,
    userType.CONNECTING_ADMIN,
  ]),
  createJob
);

router.get(
  "/allCandidates/:adminId",

  allCandidates
);

router.put(
  "/updateCandidate/:adminId/:candidateId",
  currentUser,
  requireAuthorization([userType.CONNECTING_ADMIN]),
  updateCandidateProfile
);

router.delete(
  "/deleteCandidate/:adminId/:candidateId",
  currentUser,
  requireAuthorization([userType.CONNECTING_ADMIN]),
  deleteCandidateProfile
);

router.put(
  "/bookmarkCandidate/:adminId",
  currentUser,
  requireAuthorization([userType.CONNECTING_ADMIN]),
  bookmarkCandidateProfileByAdmin
);

router.get(
  "/ShowbookmarkedCandidateProfilesByAdmin/:adminId",
  currentUser,
  requireAuthorization([userType.CONNECTING_ADMIN]),
  ShowbookmarkedCandidateProfilesByAdmin
);

router.post(
  "/createCandidate/:adminId",
  currentUser,
  requireAuthorization([userType.CONNECTING_ADMIN]),
  createCandidateProfile
);

router.get(
  "/allCompanies/:adminId",
  currentUser,
  requireAuthorization([userType.CONNECTING_ADMIN]),
  allCompanies
);

router.get(
  "/singleCompany/:adminId/:companyId",
  currentUser,
  requireAuthorization([userType.CONNECTING_ADMIN]),
  singleCompany
);

router.put(
  "/updateCompany/:adminId/:companyId",
  currentUser,
  requireAuthorization([userType.CONNECTING_ADMIN]),
  updateCompany
);

router.delete(
  "/deleteCompany/:adminId/:companyId",
  currentUser,
  requireAuthorization([userType.CONNECTING_ADMIN]),
  deleteCompanyProfile
);

router.put(
  "/bookmarkCompany/:adminId",
  currentUser,
  requireAuthorization([userType.CONNECTING_ADMIN]),
  bookmarkCompanyProfileByAdmin
);

router.get(
  "/showBookmarkedCompanyProfilesByAdmin/:adminId",
  currentUser,
  requireAuthorization([userType.CONNECTING_ADMIN]),
  showBookmarkedCompanyProfilesByAdmin
);

router.post(
  "/createAdminCompany",
  currentUser,
  requireAuthorization([userType.CONNECTING_ADMIN]),
  createAdminCompanyProfile
);

router.post(
  "/jobApply/:candidateId",
  currentUser,
  requireAuthorization([userType.CONNECTING_CANDIDATE]),
  applyToJob
);

router.get(
  "/getAllJobs/:candidateId",
  currentUser,
  requireAuthorization([userType.CONNECTING_CANDIDATE]),
  appliedJobsInfo
);

router.post(
  "/bookmarkJobPost/:candidateId",
  currentUser,
  requireAuthorization([userType.CONNECTING_CANDIDATE]),
  bookmarkJobPost
);

router.get(
  "/bookmarkedJobs/:candidateId",
  currentUser,
  requireAuthorization([userType.CONNECTING_CANDIDATE]),
  bookmarkedJobsInfo
);

router.get(
  "/candidatesWhoHasAppliedToJob/:jobPostId",
  currentUser,
  requireAuthorization([userType.CONNECTING_RECRUITER]),
  candidatesWhoHasAppliedToJob
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google login callback
router.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

router.get("/auth/microsoft", passport.authenticate("microsoft"));

// Microsoft login callback
router.get(
  "/api/auth/microsoft/callback",
  passport.authenticate("microsoft", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

module.exports = router;
