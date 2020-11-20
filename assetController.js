const mongoose = require("mongoose");
const Asset = require("./Asset.model");
const Unit = require("./Unit.model");
const User = require("./User.model");

const assetController = {
  index: async (req, res) => {
    const assets = await Asset.find({}).populate("unit", "name");
    res.json(assets);
  },
  find: async (req, res) => {
    const asset = await Asset.findById(req.params.id);
    res.json(asset);
  },
  create: async (req, res) => {
    const { unit, name, image, model, description, user } = req.body;

    const targetUnit = await Unit.findOne({
      name: unit,
    });

    const targetUser = await User.findOne({
      name: user,
    });

    const newAsset = new Asset({
      _id: new mongoose.Types.ObjectId(),
      unit: targetUnit._id,
      name,
      image,
      model,
      description,
      user,
    });

    await Unit.updateOne(
      { _id: targetUnit._id },
      { $push: { assets: newAsset._id } }
    );

    await User.updateOne(
      { _id: targetUser },
      { $push: { assets: newAsset._id } }
    );

    try {
      const savedAsset = await newAsset.save();
      res.status(200).json(savedAsset);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  update: async (req, res) => {
    const { target, name, image, model, description } = req.body;

    const unit = await Unit.findOne({
      name: req.body.unit,
    })._id;

    const user = await User.findOne({
      name: req.body.user,
    })._id;

    const updatedAsset = await Asset.findOneAndUpdate(
      {
        name: target,
      },
      {
        $set: {
          name,
          unit,
          image,
          model,
          description,
          user,
        },
      },
      {
        new: true,
      }
    );
    res.json(updatedAsset);
  },
  delete: async (req, res) => {
    const { name } = req.body;

    let deletedAsset = await Asset.findOneAndDelete({
      name,
    });
    res.json(deletedAsset);
  },
};

module.exports = assetController;
