const contactEmail = require("../Models/contactEmail");
const usercontactModel = require("../Models/usercontactModel");
const nodemailer = require("nodemailer");
const userContactData = async (req, res) => {
  try {
    const { _id, Name, Mobile, Email } = req.body;
    const admissions = await contactEmail.findOne({ isDeleted: false });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "info.actkidz@gmail.com",
        pass: "tbirmfmkunknskdc",
      },
    });
    const mailOptions = {
      from: "info.actkidz@gmail.com",
      to: `${admissions?.Email}`,
      subject: "New Website Form Submission for actkidz.com",
      text: `
        Name: ${Name}
        Mobile: ${Mobile}
        Email: ${Email}
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
      Name,
      Mobile,
      Email,
    };
    const updatedData = await usercontactModel.findOneAndUpdate(
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

const getuserContactData = async (req, res) => {
  try {
    const userHomeData = await usercontactModel.findOne({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "userHomeData retrieved succesfully",
      data: userHomeData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const updateuserContactData = async (req, res) => {
  try {
    const { Name, Mobile, Email } = req.body;
    const userHomeId = req.params.userHomeId;

    const UpdateuserHome = await usercontactModel.findByIdAndUpdate(
      userHomeId,
      { $set: { Name, Mobile, Email } },
      { new: true }
    );

    // console.log("Update result:", UpdateuserHome);

    return res.status(200).send({
      status: true,
      msg: "Data updated successfully",
      data: UpdateuserHome,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const DeleteuserContactdata = async (req, res) => {
  try {
    const result = await usercontactModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} userHomedata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

module.exports = {
  userContactData,
  getuserContactData,
  updateuserContactData,
  DeleteuserContactdata,
};
