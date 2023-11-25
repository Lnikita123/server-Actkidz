const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage(); // using memory storage for simplicity
const upload = multer({ storage: storage });
const {
  homeData,
  getData,
  getById,
  updateData,
  Deletedata,
  DeleteById,
} = require("../Controllers/homeController");
const {
  feePlaceholder,
  DeleteByIddata,
  updatefeeData,
  getfeeData,
  DeletefeeData,
} = require("../Controllers/feePlaceholder");
const {
  StudentContacts,
  getAllContacts,
  getContactById,
  deleteContact,
  DeleteContactdata,
  updateContact,
} = require("../Controllers/contactController");

const {
  Studentadmissions,
  getAlladmissions,
  getadmissionsById,
  deleteadmissions,
  updateadmissions,
  Deleteadmissiondata,
} = require("../Controllers/admissionController");
const {
  aboutData,
  getaboutData,
  getaboutById,
  updateaboutData,
  Deleteaboutdata,
  DeleteaboutById,
} = require("../Controllers/aboutController");

const {
  activityData,
  getactivityData,
  getactivityById,
  updateactivityData,
  Deleteactivitydata,
  DeleteactivityById,
} = require("../Controllers/activityController");

const {
  pdfData,
  getpdfData,
  getpdfById,
  updatepdfData,
  Deletepdfdata,
  DeletepdfById,
} = require("../Controllers/pdfController");

//user
const {
  createUser,
  userLogin,
  getusersData,
} = require("../Controllers/loginController");
const {
  userData,
  getuserData,
  updateuserData,
  Deleteuserdata,
} = require("../Controllers/userController");

const {
  formPopuData,
  getformPopuData,
  updateformPopuData,
  DeleteformPopudata,
} = require("../Controllers/formpopupController");
const {
  userAdmissionData,
  getuserAdmissionData,
  updateuserAdmissionData,
  DeleteuserAdmissiondata,
} = require("../Controllers/userAdmission");

const {
  userContactData,
  getuserContactData,
  updateuserContactData,
  DeleteuserContactdata,
} = require("../Controllers/usercontactController");
//Home//
router.post("/createData", upload.single("Photo"), homeData);
router.get("/getData", getData);
router.get("/getById/:homeId", getById);
router.put("/updateData/:homeId", upload.single("Photo"), updateData);
router.delete("/deleteData", Deletedata);
router.delete("/deleteId/:homeId", DeleteById);
// fee placeholder
router.post("/createFeePlaceholder", feePlaceholder);
router.get("/getfeeData", getfeeData);
router.put("/updatefeeData/:feeId", updatefeeData);
router.delete("/deleteId/:feeId", DeleteByIddata);
router.delete("/DeletefeeData", DeletefeeData);
//contact//
router.post("/contactData", StudentContacts);
router.get("/getcontactData", getAllContacts);
router.get("/getcontactById/:contactId", getContactById);
router.put("/updateContactData/:contactId", updateContact);
router.delete("/deletecontactData", deleteContact);
router.delete("/DeleteContactdat", DeleteContactdata);

//Admission//
router.post("/Studentadmissions", Studentadmissions);
router.get("/getAlladmissions", getAlladmissions);
router.get("/getadmissionsById/:admissionId", getadmissionsById);
router.put("/updateadmissions/:admissionId", updateadmissions);
router.delete("/deleteadmissions", deleteadmissions);
router.delete("/Deleteadmissiondata", Deleteadmissiondata);
//About//
router.post("/createaboutData", upload.single("Photo"), aboutData);
router.get("/getaboutData", getaboutData);
router.get("/getaboutById/:aboutId", getaboutById);
router.put(
  "/updataabouteData/:aboutId",
  upload.single("Photo"),
  updateaboutData
);
router.delete("/deleteaboutData", Deleteaboutdata);
router.delete("/deleteaboutId/:aboutId", DeleteaboutById);

//Activity//
router.post(
  "/createactivityData",
  upload.fields([{ name: "Photo" }]),
  activityData
);
router.get("/getactivityData", getactivityData);
router.get("/getactivityById/:activityId", getactivityById);
router.put(
  "/updateActivityData/:activityId",
  upload.fields([{ name: "Photo" }, { name: "Pdf" }]),
  updateactivityData
);
router.delete("/deleteactivityData", Deleteactivitydata);
router.delete("/deleteactivityId/:activityId", DeleteactivityById);

//pdf
router.post("/pdfData", upload.single("Photo"), pdfData);
router.get("/getpdfData", getpdfData);
router.get("/getpdfById/:pdfId", getpdfById);
router.put("/updatepdfData/:pdfId", upload.single("Photo"), updatepdfData);
router.delete("/Deletepdfdata", Deletepdfdata);
router.delete("/DeletepdfById/:pdfId", DeletepdfById);

//***********  User *************//

router.post("/userData", userData);
router.get("/getuserData", getuserData);
router.put("/updateuserData/:userId", updateuserData);
router.delete("/Deleteuserdata", Deleteuserdata);

//UserAdmission
router.post("/userAdmissionData", userAdmissionData);
router.get("/getuserAdmissionData", getuserAdmissionData);
router.put(
  "/updateuserAdmissionData/:userAdmissionId",
  updateuserAdmissionData
);
router.delete("/DeleteuserAdmissiondata", DeleteuserAdmissiondata);

//UserContact
router.post("/userContactData", userContactData);
router.get("/getuserContactData", getuserContactData);
router.put("/updateuserContactData/:userContactId", updateuserContactData);
router.delete("/DeleteuserContactdata", DeleteuserContactdata);

//FormPopup//
router.post("/formPopupData", formPopuData);
router.get("/getformPopupData", getformPopuData);
router.put("/updateformPopupData/:formId", updateformPopuData);
router.delete("/DeleteformPopupdata", DeleteformPopudata);
//user Login
router.post("/createUser", createUser);
router.post("/userLogin", userLogin);
router.get("/getusersData", getusersData);
module.exports = router;
