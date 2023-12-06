const careerModal = require("../Models/CareerModel");
const careerData = async (req, res) => {
  try {
    const { _id, id, Photos, Link, Heading, Published } = req.body;
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
      Link,
      Heading,
      Published,
    };

    // Find a document with the provided _id (if it exists) and update it with the new values.
    // If a document with the provided _id does not exist or no _id is provided, create a new document.
    const updatedData = await careerModal.findOneAndUpdate(
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

const getcareerData = async (req, res) => {
  try {
    const careerData = await careerModal.findOne();
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

    const page = await careerModal.findOne({ careerId: careerId });
    if (!page) {
      return res.status(400).send({ status: false, message: `page not Found` });
    }
    if (page.isDeleted == false) {
      await careerModal.findOneAndUpdate(
        { careerId: careerId },
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
