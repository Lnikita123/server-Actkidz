const homeModel = require("../Models/homeModel");
const homeData = async (req, res) => {
  try {
    const { _id, id, Heading, Description, Photo, Published } = req.body;

    if (!Photo) {
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
      Photo,
      Published,
    };

    // Find a document with the provided _id (if it exists) and update it with the new values.
    // If a document with the provided _id does not exist or no _id is provided, create a new document.
    const updatedData = await homeModel.findOneAndUpdate(
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

const getData = async (req, res) => {
  try {
    const homeData = await homeModel.findOne({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "homeData retrieved succesfully",
      data: homeData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getById = async (req, res) => {
  const homeId = req.params.homeId;
  const homeData = await homeModel.findOne({
    homeId: homeId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: homeData });
};

const updateData = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let homeId = req.params.homeId;
    const existingUnit = await homeModel.findOne({
      Published,
      id: { $ne: homeId },
    });
    let updateBody = await homeModel.findOneAndUpdate(
      { id: homeId },
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
const Deletedata = async (req, res) => {
  try {
    const result = await homeModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} homedata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
const DeleteById = async (req, res) => {
  try {
    let homeId = req.params.homeId;

    const page = await homeModel.findOne({ homeId: homeId });
    if (!page) {
      return res.status(400).send({ status: false, message: `page not Found` });
    }
    if (page.isDeleted == false) {
      await homeModel.findOneAndUpdate(
        { homeId: homeId },
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
  homeData,
  getData,
  getById,
  updateData,
  Deletedata,
  DeleteById,
};
