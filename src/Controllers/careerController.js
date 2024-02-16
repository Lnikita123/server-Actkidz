const careerModal = require("../Models/CareerModel");
const careerData = async (req, res) => {
  try {
    const { _id, id, Photos, Link, Heading, Published } = req.body;

    // findOneAndUpdate parameters: query, update, options
    const newData = await careerModal.findOneAndUpdate(
      { id }, // Query to find the document
      { id, Photos, Link, Heading, Published }, // The data to be updated or inserted
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

const getcareerData = async (req, res) => {
  try {
    const careerData = await careerModal.find();
    res.status(200).send({
      status: true,
      msg: "careerData retrieved succesfully",
      data: careerData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
const updatecareerData = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let careerId = req.params.careerId;
    const existingUnit = await careerModal.findOne({
      Published,
      id: { $ne: careerId },
    });

    let updateBody = await careerModal.findOneAndUpdate(
      { id: careerId },
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

const DeletecareerById = async (req, res) => {
  try {
    let careerId = req.params.careerId;

    // Convert careerId to Number as your id in schema is of type Number
    careerId = Number(careerId);

    // Check if the document exists and is not deleted
    const page = await careerModal.findOne({
      id: careerId,
      isDeleted: false,
    });
    if (!page) {
      return res
        .status(404)
        .send({ status: false, message: `Page not found or already deleted` });
    }

    // Perform the hard delete
    await careerModal.findOneAndDelete({ id: careerId });

    return res
      .status(200)
      .send({ status: true, message: `Data deleted successfully.` });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "Server error", error: err.message });
  }
};

const DeletecareerData = async (req, res) => {
  try {
    const result = await careerModal.deleteMany({});
    res.send(`Deleted ${result.deletedCount} homedata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
module.exports = {
  careerData,
  DeletecareerById,
  updatecareerData,
  getcareerData,
  DeletecareerData,
};
