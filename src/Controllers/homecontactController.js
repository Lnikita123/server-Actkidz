const express = require("express");
const homecontactModel = require("../Models/homeContactModel");

const Studenthomecontacts = async (req, res) => {
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

    const updatedData = await homecontactModel.findOneAndUpdate(
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
const getAllhomecontacts = async (req, res) => {
  try {
    const homecontacts = await homecontactModel.findOne({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "homecontacts retrieved successfully",
      data: homecontacts,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const gethomecontactById = async (req, res) => {
  try {
    const homecontactId = req.params.homecontactId;
    const homecontact = await homecontactModel.findById(homecontactId);
    if (!homecontact) {
      return res.status(404).send({
        status: false,
        msg: "homecontact not found",
      });
    }
    res.status(200).send({
      status: true,
      msg: "homecontact retrieved successfully",
      data: homecontact,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const updatehomecontact = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let homecontactId = req.params.homecontactId;

    const existingUnit = await homecontactModel.findOne({
      Published,
      id: { $ne: homecontactId },
    });
    let updateBody = await homecontactModel.findOneAndUpdate(
      { id: homecontactId },
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

const deletehomecontact = async (req, res) => {
  try {
    const homecontactId = req.params.homecontactId;
    const deletedhomecontact = await homecontactModel.findByIdAndDelete(
      homecontactId
    );

    if (!deletedhomecontact) {
      return res.status(404).send({
        status: false,
        msg: "homecontact not found",
      });
    }

    res.status(200).send({
      status: true,
      msg: "homecontact deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
const Deletehomecontactdata = async (req, res) => {
  try {
    const result = await homecontactModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} homecontact`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
module.exports = {
  Studenthomecontacts,
  getAllhomecontacts,
  gethomecontactById,
  deletehomecontact,
  Deletehomecontactdata,
  updatehomecontact,
};
