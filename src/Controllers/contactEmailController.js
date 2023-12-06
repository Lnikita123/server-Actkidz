const express = require("express");
const contactEmailModel = require("../Models/contactEmail");
const postcontactEmailForm = async (req, res) => {};
const StudentcontactEmails = async (req, res) => {
  try {
    const { _id, id, Email, Published } = req.body;
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    let query = {};
    if (_id) {
      query._id = _id;
    }
    const update = {
      id,
      Email,
      Published,
    };

    const updatedData = await contactEmailModel.findOneAndUpdate(
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
const getAllcontactEmails = async (req, res) => {
  try {
    const contactEmails = await contactEmailModel.findOne({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "contactEmails retrieved successfully",
      data: contactEmails,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getcontactEmailById = async (req, res) => {
  try {
    const contactEmailId = req.params.contactEmailId;
    const contactEmail = await contactEmailModel.findById(contactEmailId);
    if (!contactEmail) {
      return res.status(404).send({
        status: false,
        msg: "contactEmail not found",
      });
    }
    res.status(200).send({
      status: true,
      msg: "contactEmail retrieved successfully",
      data: contactEmail,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const updatecontactEmail = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let contactEmailId = req.params.contactEmailId;

    const existingUnit = await contactEmailModel.findOne({
      Published,
      id: { $ne: contactEmailId },
    });
    let updateBody = await contactEmailModel.findOneAndUpdate(
      { id: contactEmailId },
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

const deletecontactEmail = async (req, res) => {
  try {
    const contactEmailId = req.params.contactEmailId;
    const deletedcontactEmail = await contactEmailModel.findByIdAndDelete(
      contactEmailId
    );

    if (!deletedcontactEmail) {
      return res.status(404).send({
        status: false,
        msg: "contactEmail not found",
      });
    }

    res.status(200).send({
      status: true,
      msg: "contactEmail deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
const DeletecontactEmaildata = async (req, res) => {
  try {
    const result = await contactEmailModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} contactEmail`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
module.exports = {
  StudentcontactEmails,
  getAllcontactEmails,
  getcontactEmailById,
  deletecontactEmail,
  DeletecontactEmaildata,
  updatecontactEmail,
};
