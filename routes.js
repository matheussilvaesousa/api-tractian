const express = require("express");
const companyController = require("./companyController");
const unitController = require("./unitController");
const assetController = require("./assetController");
const userController = require("./userController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Home");
});

// Companies
router.get("/companies", companyController.index);
router.get("/companies/:id", companyController.find);
router.post("/companies", companyController.create);
router.patch("/companies", companyController.update);
router.delete("/companies", companyController.delete);

//Users
router.get("/users", userController.index);
router.get("/users:id", userController.find);
router.post("/users", userController.create);

// Units
router.get("/units", unitController.index);
router.get("/units/:id", unitController.find);
router.post("/units", unitController.create);

// Assets
router.get("/assets", assetController.index);
router.get("/assets", assetController.find);
router.post("/assets", assetController.create);
router.patch("/assets", assetController.update);
router.delete("/assets", assetController.delete);

module.exports = router;
