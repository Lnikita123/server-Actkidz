const programModel = require("../Models/programModel");
const programData = async (req, res) => {
  try {
    const { id, Heading, Description, Age, Image1, Image2, Published } =
      req.body;

    // findOneAndUpdate parameters: query, update, options
    const newData = await programModel.findOneAndUpdate(
      { id }, // Query to find the document
      { id, Heading, Description, Age, Image1, Image2, Published }, // The data to be updated or inserted
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
const getprogramData = async (req, res) => {
  try {
    const programData = await programModel.find({ isDeleted: false });
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
