const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes");

const port = 3000;

mongoose.connect(
  "mongodb://localhost:27017/tractian",
  { useFindAndModify: false },
  (err) => {
    if (!err) {
      console.log("Server has connected to MongoDB");
    }
  }
);

app.use("/api/v1", routes);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
