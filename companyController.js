const mongoose = require("mongoose");
const Company = require("./Company.model");

const companyController = {
  index: async (req, res) => {
    const companies = await Company.find({}).populate("units users");
    res.json(companies);
  },
  find: async (req, res) => {
    const company = await Company.findById(req.params.id);
    res.json(company);
  },
  create: async (req, res) => {
    const newCompany = new Company({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
    });

    try {
      const savedCompany = await newCompany.save();
      res.status(200).json(savedCompany);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  update: async (req, res) => {
    const { target, name } = req.body;

    const updatedCompany = await Company.findOneAndUpdate(
      {
        name: target,
      },
      { $set: { name } },
      {
        new: true,
      }
    );
    res.json(updatedCompany);
  },
  delete: async (req, res) => {
    const { name } = req.body;

    let deletedCompany = await Company.findOneAndDelete({
      name,
    });
    res.json(deletedCompany);
  },
};

module.exports = companyController;
