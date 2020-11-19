const mongoose = require("mongoose");
const User = require("./User.model");
const Company = require("./Company.model");

const userController = {
  index: async (req, res) => {
    const users = await User.find({})
      .populate("company", "name")
      .populate("assets");
    res.json(users);
  },
  find: async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
  },
  create: async (req, res) => {
    const company = await Company.findOne({
      name: req.body.company,
    });

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      company: company._id,
    });

    await Company.updateOne(
      { _id: company._id },
      { $push: { users: newUser._id } }
    );

    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = userController;
