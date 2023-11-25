const feeModal = require("../Models/feePlaceholder");

const feePlaceholder = async (req, res) => {
  try {
    const { id, Description, Link, Published } = req.body;

    // findOneAndUpdate parameters: query, update, options
    const newData = await feeModal.findOneAndUpdate(
      { id }, // Query to find the document
      { id, Description, Link, Published }, // The data to be updated or inserted
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

const getfeeData = async (req, res) => {
  try {
    const feeData = await feeModal.find();
    res.status(200).send({
      status: true,
      msg: "feeData retrieved succesfully",
      data: feeData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
const updatefeeData = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let id = req.params.feeId;
    const existingUnit = await feeModal.findOne({
      Published,
      id: { $ne: id },
    });

    let updateBody = await feeModal.findOneAndUpdate(
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

const DeleteByIddata = async (req, res) => {
  try {
    let feeId = req.params.feeId;

    const page = await feeModal.findOne({ feeId: feeId });
    if (!page) {
      return res.status(400).send({ status: false, message: `page not Found` });
    }
    if (page.isDeleted == false) {
      await feeModal.findOneAndUpdate(
        { feeId: feeId },
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

const DeletefeeData = async (req, res) => {
  try {
    const result = await feeModal.deleteMany({});
    res.send(`Deleted ${result.deletedCount} homedata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
module.exports = {
  feePlaceholder,
  DeleteByIddata,
  updatefeeData,
  getfeeData,
  DeletefeeData,
};
