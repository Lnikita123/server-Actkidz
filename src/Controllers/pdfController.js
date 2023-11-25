const pdfModel = require("../Models/pdfModel");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const pdfData = async (req, res) => {
  try {
    const { id, Heading, Description, Photo, Pdf, Year, Month, Published } =
      req.body;

    // findOneAndUpdate parameters: query, update, options
    const newData = await pdfModel.findOneAndUpdate(
      { id }, // Query to find the document
      { id, Heading, Description, Photo, Pdf, Year, Month, Published }, // The data to be updated or inserted
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

const getpdfData = async (req, res) => {
  try {
    const pdfData = await pdfModel.find({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "pdfData retrieved succesfully",
      data: pdfData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getpdfById = async (req, res) => {
  const pdfId = req.params.pdfId;
  const pdfData = await pdfModel.findOne({
    pdfId: pdfId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: pdfData });
};

const updatepdfData = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let id = req.params.pdfId;
    const existingUnit = await pdfModel.findOne({
      Published,
      id: { $ne: id },
    });

    let updateBody = await pdfModel.findOneAndUpdate(
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
      messege: "Data updated successfully",
      data: updateBody,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const Deletepdfdata = async (req, res) => {
  try {
    const result = await pdfModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} pdfdata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
const DeletepdfById = async (req, res) => {
  try {
    let pdfId = req.params.pdfId;

    const page = await pdfModel.findOne({ pdfId: pdfId });
    if (!page) {
      return res.status(400).send({ status: false, message: `page not Found` });
    }
    if (page.isDeleted == false) {
      await pdfModel.findOneAndUpdate(
        { pdfId: pdfId },
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
  pdfData,
  getpdfData,
  getpdfById,
  updatepdfData,
  Deletepdfdata,
  DeletepdfById,
};
