const contactModel = require("../Models/contactModel");
const userContactModel = require("../Models/usercontactModel");
const nodemailer = require("nodemailer");
const userContactData = async (req, res) => {
  try {
    const { _id, Name, Phone, Email, Requirement, Campus, Message } = req.body;
    const contacts = await contactModel.findOne({ isDeleted: false });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nikitalilhore123@gmail.com",
        pass: "dzjfxzvmwndjwmme",
      },
    });
    const mailOptions = {
      from: "nikitalilhore123@gmail.com",
      to: `${contacts?.Email}`,
      subject: "New Student Details Submission",
      text: `
        Name: ${Name}
        Phone: ${Phone}
        Email: ${Email}
        Requirement: ${Requirement}
        Campus: ${Campus}
        Message: ${Message}
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
      Phone,
      Email,
      Requirement,
      Campus,
      Message,
    };
    const updatedData = await userContactModel.findOneAndUpdate(
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
    const userContactData = await userContactModel.findOne({
      isDeleted: false,
    });
    res.status(200).send({
      status: true,
      msg: "userContactData retrieved succesfully",
      data: userContactData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const updateuserContactData = async (req, res) => {
  try {
    const { Name, Phone, Email, Requirement, Campus, Message } = req.body;
    const userContactId = req.params.userContactId;

    const UpdateuserContact = await userContactModel.findByIdAndUpdate(
      userContactId,
      { $set: { Name, Phone, Email, Requirement, Campus, Message } },
      { new: true }
    );

    // console.log("Update result:", UpdateuserContact);

    return res.status(200).send({
      status: true,
      msg: "Data updated successfully",
      data: UpdateuserContact,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const DeleteuserContactdata = async (req, res) => {
  try {
    const result = await userContactModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} userContactdata`);
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
