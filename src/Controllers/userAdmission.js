const admissionModel = require("../Models/admissionModel");
const userAdmissionModel = require("../Models/userAdmission");
const nodemailer = require("nodemailer");
const userAdmissionData = async (req, res) => {
  try {
    const { _id, Parentname, Mobile, Email, Grade } = req.body;
    const admissions = await admissionModel.findOne({ isDeleted: false });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nikitalilhore123@gmail.com",
        pass: "dzjfxzvmwndjwmme",
      },
    });
    const mailOptions = {
      from: "nikitalilhore123@gmail.com",
      to: `${admissions?.Email}`,
      subject: "New Student Details Submission",
      text: `
        Parentname: ${Parentname}
        Mobile: ${Mobile}
        Email: ${Email}
        Grade: ${Grade}
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          status: false,
          msg: "Email not sent!",
        });
      } else {
        console.log("Email sent: " + info.response);
        res.status(201).send({
          status: true,
          msg: "Data created and email sent successfully",
          data: contact,
        });
      }
    });
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    let query = {};
    if (_id) {
      query._id = _id;
    }

    const update = {
      Parentname,
      Mobile,
      Email,
      Grade,
    };
    const updatedData = await userAdmissionModel.findOneAndUpdate(
      query,
      update,
      options
    );

    return res.status(200).send({
      status: true,
      msg: "Data created or updated successfully",
      data: updatedData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "Server error", error: err.message });
  }
};

const getuserAdmissionData = async (req, res) => {
  try {
    const userAdmissionData = await userAdmissionModel.findOne({
      isDeleted: false,
    });
    res.status(200).send({
      status: true,
      msg: "userAdmissionData retrieved succesfully",
      data: userAdmissionData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const updateuserAdmissionData = async (req, res) => {
  try {
    const { Parentname, Mobile, Email, Grade } = req.body;
    const userAdmissionId = req.params.userAdmissionId;

    const UpdateuserAdmission = await userAdmissionModel.findByIdAndUpdate(
      userAdmissionId,
      { $set: { Parentname, Mobile, Email, Grade } },
      { new: true }
    );

    return res.status(200).send({
      status: true,
      msg: "Data updated successfully",
      data: UpdateuserAdmission,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const DeleteuserAdmissiondata = async (req, res) => {
  try {
    const result = await userAdmissionModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} userAdmissiondata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

module.exports = {
  userAdmissionData,
  getuserAdmissionData,
  updateuserAdmissionData,
  DeleteuserAdmissiondata,
};
