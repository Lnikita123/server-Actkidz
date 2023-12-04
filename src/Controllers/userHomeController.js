const userHomeModel = require("../Models/userHomeModel");
const userHomeData = async (req, res) => {
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

const getuserHomeData = async (req, res) => {
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

const getuserHomeById = async (req, res) => {
  const userHomeId = req.params.userHomeId;
  const userHomeData = await userHomeModel.findOne({
    userHomeId: userHomeId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: userHomeData });
};

const updateuserHomeData = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let userHomeId = req.params.userHomeId;
    const existingUnit = await userHomeModel.findOne({
      Published,
      id: { $ne: userHomeId },
    });
    let updateBody = await userHomeModel.findOneAndUpdate(
      { id: userHomeId },
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
const DeleteuserHomedata = async (req, res) => {
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
const DeleteuserHomeById = async (req, res) => {
  try {
    let userHomeId = req.params.userHomeId;

    const page = await userHomeModel.findOne({ userHomeId: userHomeId });
    if (!page) {
      return res.status(400).send({ status: false, message: `page not Found` });
    }
    if (page.isDeleted == false) {
      await userHomeModel.findOneAndUpdate(
        { userHomeId: userHomeId },
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
  userHomeData,
  getuserHomeData,
  getuserHomeById,
  updateuserHomeData,
  DeleteuserHomedata,
  DeleteuserHomeById,
};
