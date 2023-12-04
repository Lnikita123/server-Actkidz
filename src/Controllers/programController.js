const programModel = require("../Models/programModel");
const programData = async (req, res) => {
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
    const updatedData = await programModel.findOneAndUpdate(
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

const getprogramData = async (req, res) => {
  try {
    const programData = await programModel.findOne({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "programData retrieved succesfully",
      data: programData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getprogramById = async (req, res) => {
  const programId = req.params.programId;
  const programData = await programModel.findOne({
    programId: programId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: programData });
};

const updateprogramData = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let programId = req.params.programId;
    const existingUnit = await programModel.findOne({
      Published,
      id: { $ne: programId },
    });
    let updateBody = await programModel.findOneAndUpdate(
      { id: programId },
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
const Deleteprogramdata = async (req, res) => {
  try {
    const result = await programModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} programdata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
const DeleteprogramById = async (req, res) => {
  try {
    let programId = req.params.programId;

    const page = await programModel.findOne({ programId: programId });
    if (!page) {
      return res.status(400).send({ status: false, message: `page not Found` });
    }
    if (page.isDeleted == false) {
      await programModel.findOneAndUpdate(
        { programId: programId },
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
  programData,
  getprogramData,
  getprogramById,
  updateprogramData,
  Deleteprogramdata,
  DeleteprogramById,
};
