const contactModel = require("../Models/contactModel");
const userHomeModel = require("../Models/userHomeModel");
const nodemailer = require("nodemailer");
const userHomeHomeData = async (req, res) => {
  try {
    const { _id, Name, Mobile, Query } = req.body;
    console.log(req.body);
    const admissions = await contactModel.findOne({ isDeleted: false });
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
        Query: ${Query}
          
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
      Query,
    };
    const updatedData = await userHomeModel.findOneAndUpdate(
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

const getuserHomeHomeData = async (req, res) => {
  try {
    const userHomeData = await userHomeModel.findOne({ isDeleted: false });
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

const updateuserHomeHomeData = async (req, res) => {
  try {
    const { Name, Mobile, Query } = req.body;
    const userHomeId = req.params.userHomeId;

    const UpdateuserHome = await userHomeModel.findByIdAndUpdate(
      userHomeId,
      { $set: { Name, Mobile, Query } },
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

const DeleteuserHomeHomedata = async (req, res) => {
  try {
    const result = await userHomeModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} userHomedata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

module.exports = {
  userHomeHomeData,
  getuserHomeHomeData,
  updateuserHomeHomeData,
  DeleteuserHomeHomedata,
};
