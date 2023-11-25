const admissionModel = require("../Models/admissionModel");
const userModel = require("../Models/userModel");
const nodemailer = require("nodemailer");
const userData = async (req, res) => {
  try {
    const { _id, Name, Mobile, Email, Qualifications, Experience, Resume } =
      req.body;
    const resumeBuffer = Buffer.from(Resume, "base64");
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
      subject: "New Teachers Details Submission",
      text: `
        Name: ${Name}
          Mobile: ${Mobile}
          Email: ${Email}
          Qualifications: ${Qualifications}
          Experience: ${Experience}
        `,
      attachments: [
        {
          filename: "resume.pdf",
          content: resumeBuffer,
        },
      ],
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
      Name,
      Mobile,
      Email,
      Qualifications,
      Experience,
      Resume,
    };
    const updatedData = await userModel.findOneAndUpdate(
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

const getuserData = async (req, res) => {
  try {
    const userData = await userModel.findOne({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "userData retrieved succesfully",
      data: userData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const updateuserData = async (req, res) => {
  try {
    const { Name, Mobile, Email, Qualifications, Experience, Resume } =
      req.body;
    const userId = req.params.userId;

    const Updateuser = await userModel.findByIdAndUpdate(
      userId,
      { $set: { Name, Mobile, Email, Qualifications, Experience, Resume } },
      { new: true }
    );

    // console.log("Update result:", Updateuser);

    return res.status(200).send({
      status: true,
      msg: "Data updated successfully",
      data: Updateuser,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const Deleteuserdata = async (req, res) => {
  try {
    const result = await userModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} userdata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

module.exports = {
  userData,
  getuserData,
  updateuserData,
  Deleteuserdata,
};
