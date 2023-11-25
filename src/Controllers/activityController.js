const activityModel = require("../Models/activityModel");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const activityData = async (req, res) => {
  try {
    const { id, Heading, Description, Photo, Published } = req.body;

    // findOneAndUpdate parameters: query, update, options
    const newData = await activityModel.findOneAndUpdate(
      { id }, // Query to find the document
      { id, Heading, Description, Photo, Published }, // The data to be updated or inserted
      {
        new: true, // Return the modified document rather than the original
        upsert: true, // Create a new document if no document matches the query
      }
    );

    return res.status(201).send({
      status: true,
      msg: "Data created or updated successfully",
      data: newData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "Server error", error: err.message });
  }
};

const getactivityData = async (req, res) => {
  try {
    const activityData = await activityModel.find({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "activityData retrieved succesfully",
      data: activityData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getactivityById = async (req, res) => {
  const activityId = req.params.activityId;
  const activityData = await activityModel.findOne({
    activityId: activityId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: activityData });
};

const updateactivityData = async (req, res) => {
  try {
    const { Published } = req.body;
    let id = req.params.activityId;
    const existingUnit = await activityModel.findOne({
      Published,
      id: { $ne: id },
    });
    let updateBody = await activityModel.findOneAndUpdate(
      { id: id },
      {
        $set: {
          Published: Published,
        },
      },
      { new: true }
    );
    return res.status(200).send({
      status: true,
      msg: "Data updated successfully",
      data: updateBody,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const Deleteactivitydata = async (req, res) => {
  try {
    const result = await activityModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} activitydata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
const DeleteactivityById = async (req, res) => {
  try {
    let activityId = req.params.activityId;

    const page = await activityModel.findOne({ activityId: activityId });
    if (!page) {
      return res.status(400).send({ status: false, message: `page not Found` });
    }
    if (page.isDeleted == false) {
      await activityModel.findOneAndUpdate(
        { activityId: activityId },
        { $set: { isDeleted: true, deletedAt: new Date() } }
      );

      return res
        .status(200)
        .send({ status: true, message: `Data deleted successfully.` });
    }
    return res
      .status(400)
      .send({ status: true, message: `Data has been already deleted.` });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
module.exports = {
  activityData,
  getactivityData,
  getactivityById,
  updateactivityData,
  Deleteactivitydata,
  DeleteactivityById,
};
