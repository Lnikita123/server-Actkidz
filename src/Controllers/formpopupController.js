const contactModel = require("../Models/contactModel");
const formpopupModel = require("../Models/formfillpopup");
const nodemailer = require("nodemailer");
const formPopuData = async (req, res) => {
  try {
    const {
      _id,
      Childname,
      DateofBirth,
      Admission,
      Campus,
      CurrentSchool,
      Location,
      Fathernumber,
      Mothernumber,
      EmailId,
    } = req.body;
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
      subject: "New Student Details Submission",
      text: `
        Childname: ${Childname}
        DateofBirth: ${DateofBirth}
       EmailId: ${EmailId}
       Admission:${Admission}
       Campus:${Campus}
       CurrentSchool:${CurrentSchool}
       Location:${Location}
       Fathernumber:${Fathernumber}
       Mothernumber:${Mothernumber}
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
          msg: "Data created andEmailId sent successfully",
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
      Childname,
      DateofBirth,
      Admission,
      Campus,
      CurrentSchool,
      Location,
      Fathernumber,
      Mothernumber,
      EmailId,
    };
    const updatedData = await formpopupModel.findOneAndUpdate(
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

const getformPopuData = async (req, res) => {
  try {
    const formPopuData = await formpopupModel.findOne({
      isDeleted: false,
    });
    res.status(200).send({
      status: true,
      msg: "formPopuData retrieved succesfully",
      data: formPopuData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const updateformPopuData = async (req, res) => {
  try {
    const {
      Childname,
      DateofBirth,
      Admission,
      Campus,
      CurrentSchool,
      Location,
      Fathernumber,
      Mothernumber,
      EmailId,
    } = req.body;
    const formPopuId = req.params.formPopuId;

    const UpdateformPopu = await formpopupModel.findByIdAndUpdate(
      formPopuId,
      {
        $set: {
          Childname,
          DateofBirth,
          Admission,
          Campus,
          CurrentSchool,
          Location,
          Fathernumber,
          Mothernumber,
          EmailId,
        },
      },
      { new: true }
    );

    return res.status(200).send({
      status: true,
      msg: "Data updated successfully",
      data: UpdateformPopu,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const DeleteformPopudata = async (req, res) => {
  try {
    const result = await formpopupModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} formPopudata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

module.exports = {
  formPopuData,
  getformPopuData,
  updateformPopuData,
  DeleteformPopudata,
};
