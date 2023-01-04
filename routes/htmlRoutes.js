// dependencies
const path = require("path");

module.exports = (app) => {
  // GET request to return notes.html file
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // GET request to return index.html file
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
