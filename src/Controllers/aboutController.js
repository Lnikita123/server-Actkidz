const aboutModel = require("../Models/aboutModal");
const multer = require("multer");
const upload = multer();
const aboutData = async (req, res) => {
  try {
    const { _id, id, Photo, Published } = req.body;

    if (!Photo) {
      throw new Error("No image data provided");
    }

    // Setting the upsert option to true will create a new document if one doesn't exist.
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    let query = {};
    if (_id) {
      // Use the provided _id in the query if it exists
      query._id = _id;
    }

    // The update object is what you want to save or update in the document
    const update = {
      id,
      Photo,
      Published,
    };

    // Find a document with the provided _id (if it exists) and update it with the new values.
    // If a document with the provided _id does not exist or no _id is provided, create a new document.
    const updatedData = await aboutModel.findOneAndUpdate(
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

const getaboutData = async (req, res) => {
  try {
    const aboutData = await aboutModel.findOne({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "aboutData retrieved succesfully",
      data: aboutData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getaboutById = async (req, res) => {
  const aboutId = req.params.aboutId;
  const aboutData = await aboutModel.findOne({
    aboutId: aboutId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: aboutData });
};

const updateaboutData = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let aboutId = req.params.aboutId;

    const existingUnit = await aboutModel.findOne({
      Published,
      id: { $ne: aboutId },
    });
    let updateBody = await aboutModel.findOneAndUpdate(
      { id: aboutId },
      {
        $set: {
          Published: Published,
        },
      },
      { new: true }
    );
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

//Delete all data
const Deleteaboutdata = async (req, res) => {
  try {
    const result = await aboutModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} aboutData`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const DeleteaboutById = async (req, res) => {
  try {
    let aboutId = req.params.aboutId;

    const page = await aboutModel.findOne({ aboutId: aboutId });
    if (!page) {
      return res.status(400).send({ status: false, message: `page not Found` });
    }
    if (page.isDeleted == false) {
      await aboutModel.findOneAndUpdate(
        { aboutId: aboutId },
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
  aboutData,
  getaboutData,
  getaboutById,
  updateaboutData,
  Deleteaboutdata,
  DeleteaboutById,
};
