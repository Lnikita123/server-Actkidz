const express = require("express");
const admissionModel = require("../Models/admissionModel");

const nodemailer = require("nodemailer");

const Studentadmissions = async (req, res) => {
  try {
    const { _id, Email } = req.body;

    // Setting the upsert option to true will create a new document if one doesn't exist.
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    let query = {};
    if (_id) {
      // Use the provided _id in the query if it exists
      query._id = _id;
    }

    // The update object is what you want to save or update in the document
    const update = {
      Email,
    };

    // Find a document with the provided _id (if it exists) and update it with the new values.
    // If a document with the provided _id does not exist or no _id is provided, create a new document.
    const updatedData = await admissionModel.findOneAndUpdate(
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

const getAlladmissions = async (req, res) => {
  try {
    const admissions = await admissionModel.findOne({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "admissions retrieved successfully",
      data: admissions,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getadmissionsById = async (req, res) => {
  try {
    const admissionId = req.params.admissionId;
    const admission = await admissionModel.findById(admissionId);
    if (!contact) {
      return res.status(404).send({
        status: false,
        msg: "Contact not found",
      });
    }
    res.status(200).send({
      status: true,
      msg: "Contact retrieved successfully",
      data: admission,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      msg: "server error",
      error: err.message,
    });
  }
};

const updateadmissions = async (req, res) => {
  try {
    const admissionId = req.params.admissionId;
    const { Email, ReEnteremail } = req.body;

    const updatedContact = await admissionModel.findByIdAndUpdate(
      admissionId,
      { $set: { Email: Email, ReEnteremail: ReEnteremail } },
      { new: true }
    );
    return res.status(200).send({
      status: true,
      msg: "Data updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const deleteadmissions = async (req, res) => {
  try {
    const admissionId = req.params.admissionId;
    const deletedContact = await admissionModel.findByIdAndDelete(admissionId);

    if (!deletedContact) {
      return res.status(404).send({
        status: false,
        msg: "Contact not found",
      });
    }

    res.status(200).send({
      status: true,
      msg: "Contact deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
const Deleteadmissiondata = async (req, res) => {
  try {
    const result = await admissionModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} contact`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
module.exports = {
  Studentadmissions,
  getAlladmissions,
  getadmissionsById,
  deleteadmissions,
  updateadmissions,
  Deleteadmissiondata,
};
