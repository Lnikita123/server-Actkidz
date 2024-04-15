const express = require("express");
const router = express.Router();
const multer = require("multer");
const Middleware = require("../middleware/authorization")
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
  Studenthomecontacts,
  getAllhomecontacts,
  gethomecontactById,
  deletehomecontact,
  Deletehomecontactdata,
  updatehomecontact,
} = require("../Controllers/homecontactController");
const {
  programData,
  getprogramData,
  getprogramById,
  updateprogramData,
  Deleteprogramdata,
  DeleteprogramById,
} = require("../Controllers/programController");
const {
  galleryData,
  getgalleryData,
  getgalleryById,
  updategalleryData,
  Deletegallerydata,
  DeletegalleryById,
} = require("../Controllers/galleryController");

const {
  careerData,
  DeletecareerById,
  updatecareerData,
  getcareerData,
  DeletecareerData,
} = require("../Controllers/careerController");

const {
  careerImageData,
  getcareerImageData,
  getcareerImageById,
  updatecareerImageData,
  DeletecareerImagedata,
  DeletecareerImageById,
} = require("../Controllers/careerImageController");

const {
  StudentContacts,
  getAllContacts,
  getContactById,
  deleteContact,
  DeleteContactdata,
  updateContact,
} = require("../Controllers/contactController");

const {
  contacpageData,
  getcontacpageData,
  getcontacpageById,
  updatecontacpageData,
  Deletecontacpagedata,
  DeletecontacpageById,
} = require("../Controllers/CotactpageController");
const {
  aboutData,
  getaboutData,
  getaboutById,
  updateaboutData,
  Deleteaboutdata,
  DeleteaboutById,
} = require("../Controllers/aboutController");

//**********************************user*******************************//
const {
  createUser,
  userLogin,
  getusersData,
} = require("../Controllers/loginController");

const {
  userHomeHomeData,
  getuserHomeHomeData,
  updateuserHomeHomeData,
  DeleteuserHomeHomedata,
} = require("../Controllers/userHomeController");

const {
  userContactData,
  getuserContactData,
  updateuserContactData,
  DeleteuserContactdata,
} = require("../Controllers/usercontactController");
const {
  StudentcontactEmails,
  getAllcontactEmails,
  getcontactEmailById,
  deletecontactEmail,
  DeletecontactEmaildata,
  updatecontactEmail,
} = require("../Controllers/contactEmailController");
//contactEmail//
router.post("/contactEmailData", StudentcontactEmails);
router.get("/getcontactEmailData", getAllcontactEmails);
router.get("/getcontactEmailById/:contactEmailId", getcontactEmailById);
router.put("/updateContactEmailData/:contactEmailId", updatecontactEmail);
router.delete("/deletecontactEmailData", deletecontactEmail);
router.delete("/DeleteContactEmaildat", DeletecontactEmaildata);
//Home//
router.post("/createData", Middleware.loginCheck, homeData);
router.get("/getData", getData);
router.get("/getById/:homeId", getById);
router.put("/updateData/:homeId", upload.single("Photo"), Middleware.loginCheck, updateData);
router.delete("/deleteData", Deletedata);
router.delete("/deleteId/:homeId", Middleware.loginCheck, DeleteById);

//HomeContact
router.post("/createemailData", upload.single("Photo"), Studenthomecontacts);
router.get("/getemailData", getAllhomecontacts);
router.get("/getemailById/:homecontactId", gethomecontactById);
router.put(
  "/updateemailData/:homecontactId",
  upload.single("Photo"),
  updatehomecontact
);
router.delete("/deleteemailData", Deletehomecontactdata);
router.delete("/deleteemailId/:homecontactId", deletehomecontact);

//program
router.post("/createprogramData", Middleware.loginCheck, programData);
router.get("/getprogramData", getprogramData);
router.get("/getprogramById/:programId", getprogramById);
router.put(
  "/updateprogramData/:programId",
  upload.single("Photo"), Middleware.loginCheck,
  updateprogramData
);
router.delete("/deleteprogramData", Middleware.loginCheck, Deleteprogramdata);
router.delete("/deleteprogramId/:programId", Middleware.loginCheck, DeleteprogramById);

//Gallery
router.post("/creategalleryData", upload.single("Photo"), Middleware.loginCheck, galleryData);
router.get("/getgalleryData", getgalleryData);
router.get("/getgalleryById/:galleryId", getgalleryById);
router.put(
  "/updategalleryData/:galleryId",
  upload.single("Photo"), Middleware.loginCheck,
  updategalleryData
);
router.delete("/deletegalleryData", Middleware.loginCheck, Deletegallerydata);
router.delete("/deletegalleryId/:galleryId", Middleware.loginCheck, DeletegalleryById);

//Career
router.post("/careerData", upload.single("Photo"), Middleware.loginCheck, careerData);
router.get("/getcareerData", getcareerData);
// router.get("/getgalleryById/:careerId", getcareerById);
router.put(
  "/updateCareerData/:careerId",
  upload.single("Photo"), Middleware.loginCheck,
  updatecareerData
);
router.delete("/deletecareerData", DeletecareerData);
router.delete("/deletecareerId/:careerId", DeletecareerById);

//careerImage

router.post("/careerImageData", upload.single("Photo"), Middleware.loginCheck, careerImageData);
router.get("/getcareerImageData", getcareerImageData);
router.get("/getcareerImageById/:careerImageId", getcareerImageById);
router.put(
  "/updatecareerImageData/:careerImageId",
  upload.single("Photo"), Middleware.loginCheck,
  updatecareerImageData
);
router.delete("/DeletecareerImagedata", Middleware.loginCheck, DeletecareerImagedata);
router.delete("/DeletecareerImageById/:careerImageId", Middleware.loginCheck, DeletecareerImageById);
//contactPage
router.post("/contactpageData", upload.single("Photo"), contacpageData);
router.get("/getcontactpageData", getcontacpageData);
router.get("/getcontactpageById/:contactpageId", getcontacpageById);
router.put(
  "/updatecontactpageData/:contactpageId",
  upload.single("Photo"),
  updatecontacpageData
);
router.delete("/Deletecontactpagedata", Deletecontacpagedata);
router.delete("/DeletecontactpageById/:contactpageId", DeletecontacpageById);
//contact//
router.post("/contactData", StudentContacts);
router.get("/getcontactData", getAllContacts);
router.get("/getcontactById/:contactId", getContactById);
router.put("/updateContactData/:contactId", updateContact);
router.delete("/deletecontactData", deleteContact);
router.delete("/DeleteContactdat", DeleteContactdata);

//About//
router.post("/createaboutData", upload.single("Photo"), Middleware.loginCheck, aboutData);
router.get("/getaboutData", getaboutData);
router.get("/getaboutById/:aboutId", getaboutById);
router.put(
  "/updataabouteData/:aboutId",
  upload.single("Photo"), Middleware.loginCheck,
  updateaboutData
);
router.delete("/deleteaboutData", Middleware.loginCheck, Deleteaboutdata);
router.delete("/deleteaboutId/:aboutId", Middleware.loginCheck, DeleteaboutById);

//***********  User *************//

//user Login
router.post("/createUser", createUser);
router.post("/LoginuseData", userLogin);
router.get("/getusersData", getusersData);
//userHome
router.post("/userHomeData", userHomeHomeData);
router.get("/getuserHomeData", getuserHomeHomeData);
router.put("/updateuserHomeData/:userHomeId", updateuserHomeHomeData);
router.delete("/DeleteuserHomedata", DeleteuserHomeHomedata);

//UserEmailData

router.post("/userContactData", userContactData);
router.get("/getuserContactData", getuserContactData);
router.put("/updateuserContactData/:contactId", updateuserContactData);
router.delete("/DeleteuserContactdata", DeleteuserContactdata);

module.exports = router;
