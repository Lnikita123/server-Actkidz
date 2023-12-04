const galleryModel = require("../Models/galleryModel");
const multer = require("multer");
const upload = multer();
const galleryData = async (req, res) => {
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
    const updatedData = await galleryModel.findOneAndUpdate(
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

const getgalleryData = async (req, res) => {
  try {
    const galleryData = await galleryModel.findOne({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "galleryData retrieved succesfully",
      data: galleryData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getgalleryById = async (req, res) => {
  const galleryId = req.params.galleryId;
  const galleryData = await galleryModel.findOne({
    galleryId: galleryId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: galleryData });
};

const updategalleryData = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let galleryId = req.params.galleryId;

    const existingUnit = await galleryModel.findOne({
      Published,
      id: { $ne: galleryId },
    });
    let updateBody = await galleryModel.findOneAndUpdate(
      { id: galleryId },
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
const Deletegallerydata = async (req, res) => {
  try {
    const result = await galleryModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} galleryData`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const DeletegalleryById = async (req, res) => {
  try {
    let galleryId = req.params.galleryId;

    const page = await galleryModel.findOne({ galleryId: galleryId });
    if (!page) {
      return res.status(400).send({ status: false, message: `page not Found` });
    }
    if (page.isDeleted == false) {
      await galleryModel.findOneAndUpdate(
        { galleryId: galleryId },
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
  galleryData,
  getgalleryData,
  getgalleryById,
  updategalleryData,
  Deletegallerydata,
  DeletegalleryById,
};
