// dependencies
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  // creating notes variable
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    var notes = JSON.parse(data);

    //updates the json file whenever a note is added or deleted
    function updateDb() {
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return true;
      });
    }

    // API route GET request
    app.get("/api/notes", function (req, res) {
      //return all saved notes as JSON //
      res.json(notes);
    });

    // API route POST request
    app.post("/api/notes", function (req, res) {
      // Receives a new note, adds it to db.json, then returns the new note
      let newNote = req.body;
      notes.push(newNote);
      updateDb();
      return console.log("Added new note: " + newNote.title);
    });

    // GET request to return notes.html file
    app.get("/notes", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // GET request to return index.html file
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  });
};
