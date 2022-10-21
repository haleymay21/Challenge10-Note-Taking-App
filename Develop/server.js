// dependencies //
const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");

// Initializing express //
const app = express();
const PORT = process.env.PORT || 3000;

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Require routes file
require("./routes/routes")(app);

// PORT listener //
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
