const express = require('express');
const app = express();
const database = require('./database');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes

// render the home page from notes.ejs file
app.get('/', (req, res) => {
    const searchTerm = req.query.searchTerm;
    // get all notes from the database
    const notes = database.getNotes(searchTerm);
    res.render("notes.ejs", {
        notes
    });
})


// notes route
app.get("/notes", (req, res) => {
    const notes = database.getNotes();
    res.render("notes.ejs", {
        notes
    });
});

// individual note route
app.get("/notes/:id", (req, res) => {

    // plus converts the string to a number
    const id = +req.params.id;

    // finds the note from the array with the id
    const note = database.getNote(id);

    // if the note is not found, show the 404 page
    if (!note) {
        res.status(404).render("error404.ejs")
        return
    }

    // render the singleNote page
    res.render("singleNote.ejs", {
        note
    })
    // res.send(note);
})


// create a new note
app.get("/createNote", (req, res) => {
    res.render("createNote.ejs");
});

// post request to create a new note
app.post("/notes", (req, res) => {

    // get the title and content from the form
    const data = req.body;

    // add the note to the database
    database.addNote(data);

    // redirect to the notes page
    res.redirect("/notes");
})

// post request to delete a note
app.post("/notes/:id/delete", (req, res) => {
    const id = +req.params.id;
    database.deleteNote(id);
    res.redirect("/notes");
})


// 404 page, * is a wildcard that matches anything 
app.get('*', (req, res) => {
    res.status(404).render("error404.ejs")
})

// start the server
const port = 8080;

// listen for requests
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})