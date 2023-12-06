const contacpageModel = require("../Models/contactpageModel");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const contacpageData = async (req, res) => {
  try {
    const { id, Address, Photo, Published } = req.body;

    // findOneAndUpdate parameters: query, update, options
    const newData = await contacpageModel.findOneAndUpdate(
      { id }, // Query to find the document
      { id, Address, Photo, Published }, // The data to be updated or inserted
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

const getcontacpageData = async (req, res) => {
  try {
    const contacpageData = await contacpageModel.findOne();
    res.status(200).send({
      status: true,
      msg: "contacpageData retrieved succesfully",
      data: contacpageData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getcontacpageById = async (req, res) => {
  const contactpageId = req.params.contactpageId;
  const contacpageData = await contacpageModel.findOne({
    contactpageId: contactpageId,
    isDeleted: false,
  });
  return res.status(200).send({
    status: true,
    msg: "Data fetch succesfully",
    data: contacpageData,
  });
};

const updatecontacpageData = async (req, res) => {
  try {
    const { Published } = req.body;
    let contactpageId = req.params.contactpageId;
    await contacpageModel.findOne({
      Published,
      id: { $ne: contactpageId },
    });
    let updateBody = await contacpageModel.findOneAndUpdate(
      { id: contactpageId },
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

const Deletecontacpagedata = async (req, res) => {
  try {
    const result = await contacpageModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} contacpagedata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
const DeletecontacpageById = async (req, res) => {
  try {
    let contactpageId = req.params.contactpageId;

    const page = await contacpageModel.findOne({
      contactpageId: contactpageId,
    });
    if (!page) {
      return res.status(400).send({ status: false, message: `page not Found` });
    }
    if (page.isDeleted == false) {
      await contacpageModel.findOneAndUpdate(
        { contactpageId: contactpageId },
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
  contacpageData,
  getcontacpageData,
  getcontacpageById,
  updatecontacpageData,
  Deletecontacpagedata,
  DeletecontacpageById,
};
