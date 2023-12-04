const careerImageModel = require("../Models/careerImageModel");
const multer = require("multer");
const upload = multer();
const careerImageData = async (req, res) => {
  try {
    const { _id, id, Photos, Published } = req.body;

    if (!Photos) {
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
      Photos,
      Published,
    };

    // Find a document with the provided _id (if it exists) and update it with the new values.
    // If a document with the provided _id does not exist or no _id is provided, create a new document.
    const updatedData = await careerImageModel.findOneAndUpdate(
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

const getcareerImageData = async (req, res) => {
  try {
    const careerImageData = await careerImageModel.findOne({
      isDeleted: false,
    });
    res.status(200).send({
      status: true,
      msg: "careerImageData retrieved succesfully",
      data: careerImageData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getcareerImageById = async (req, res) => {
  const careerImageId = req.params.careerImageId;
  const careerImageData = await careerImageModel.findOne({
    careerImageId: careerImageId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({
      status: true,
      msg: "Data fetch succesfully",
      data: careerImageData,
    });
};

const updatecareerImageData = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let careerImageId = req.params.careerImageId;

    const existingUnit = await careerImageModel.findOne({
      Published,
      id: { $ne: careerImageId },
    });
    let updateBody = await careerImageModel.findOneAndUpdate(
      { id: careerImageId },
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
const DeletecareerImagedata = async (req, res) => {
  try {
    const result = await careerImageModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} careerImageData`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const DeletecareerImageById = async (req, res) => {
  try {
    let careerImageId = req.params.careerImageId;

    const page = await careerImageModel.findOne({
      careerImageId: careerImageId,
    });
    if (!page) {
      return res.status(400).send({ status: false, message: `page not Found` });
    }
    if (page.isDeleted == false) {
      await careerImageModel.findOneAndUpdate(
        { careerImageId: careerImageId },
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
  careerImageData,
  getcareerImageData,
  getcareerImageById,
  updatecareerImageData,
  DeletecareerImagedata,
  DeletecareerImageById,
};
