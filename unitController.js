const mongoose = require("mongoose");
const Unit = require("./Unit.model");
const Company = require("./Company.model");

const unitController = {
  index: async (req, res) => {
    const units = await Unit.find({})
      .populate("company", "name")
      .populate("assets");
    res.json(units);
  },
  find: async (req, res) => {
    const unit = await Unit.findById(req.params.id);
    res.json(unit);
  },
  create: async (req, res) => {
    const company = await Company.findOne({
      name: req.body.company,
    });

    const newUnit = new Unit({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      company: company._id,
    });

    await Company.updateOne(
      { _id: company._id },
      { $push: { units: newUnit._id } }
    );

    try {
      const savedUnit = await newUnit.save();
      res.status(200).json(savedUnit);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = unitController;
