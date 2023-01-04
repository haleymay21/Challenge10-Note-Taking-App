// dependencies
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  // creating notes variable
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    var notes = JSON.parse(data);
    console.log("notes1", notes);

    // updates the json file whenever a note is added or deleted
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
      newNote.id = uuidv4();
      notes.push(newNote);
      updateDb();
      res.json(newNote);
      return console.log("Added new note: " + newNote.title);
    });

    // my attempt at deleting the notes //
    app.delete("/api/notes/:id", function (req, res) {
      let noteID = req.params.id;
      console.log("notes2", notes);
      deletedNote = notes.filter((note, i) => note.id === noteID);
      console.log("deletedNotes", deletedNote);
      console.log("index", notes.indexOf(deletedNote[0]));
      let newNotes = notes.filter((note, i) => notes.indexOf(note) !== i);
      console.log("new array", newNotes);
      res.json(newNotes);
    });
  });
};
