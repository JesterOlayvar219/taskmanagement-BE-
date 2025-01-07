const mongoose = require("mongoose");

const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

mongoose
  .connect("mongodb://localhost:27017/taskdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

app.listen(5000);
