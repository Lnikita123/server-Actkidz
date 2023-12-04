const userContactModel = require("../Models/usercontactModel");
const userContactData = async (req, res) => {
  try {
    const { _id, id, Heading, Description, Photos, Published } = req.body;

    if (!Photos) {
      throw new Error("No image data provided");
    }

    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    let query = {};
    if (_id) {
      // Use the provided _id in the query if it exists
      query._id = _id;
    }

    // The update object is what you want to save or update in the document
    const update = {
      id,
      Heading,
      Description,
      Photos,
      Published,
    };

    // Find a document with the provided _id (if it exists) and update it with the new values.
    // If a document with the provided _id does not exist or no _id is provided, create a new document.
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

const getuserContactById = async (req, res) => {
  const userContactId = req.params.userContactId;
  const userContactData = await userContactModel.findOne({
    userContactId: userContactId,
    isDeleted: false,
  });
  return res.status(200).send({
    status: true,
    msg: "Data fetch succesfully",
    data: userContactData,
  });
};

const updateuserContactData = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let userContactId = req.params.userContactId;
    const existingUnit = await userContactModel.findOne({
      Published,
      id: { $ne: userContactId },
    });
    let updateBody = await userContactModel.findOneAndUpdate(
      { id: userContactId },
      {
        $set: {
          Published: Published,
        },
      },
      { new: true }
    );
    console.log("up", updateBody);
    return res.status(200).send({
      status: true,
      messege: "Data updated successfully",
      data: updateBody,
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
const DeleteuserContactById = async (req, res) => {
  try {
    let userContactId = req.params.userContactId;

    const page = await userContactModel.findOne({
      userContactId: userContactId,
    });
    if (!page) {
      return res.status(400).send({ status: false, message: `page not Found` });
    }
    if (page.isDeleted == false) {
      await userContactModel.findOneAndUpdate(
        { userContactId: userContactId },
        { $set: { isDeleted: true, deletedAt: new Date() } }
      );

      return res
        .status(200)
        .send({ status: true, message: `Data deleted successfully.` });
    }
    return res
      .status(400)
      .send({ status: true, message: `Data has been already deleted.` });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
module.exports = {
  userContactData,
  getuserContactData,
  getuserContactById,
  updateuserContactData,
  DeleteuserContactdata,
  DeleteuserContactById,
};
