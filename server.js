const express = require('express');
const app = express();
const database = require('./database');

/* MIDDLEWARE */
app.set("view engine", "ejs"); // this is required to use ejs templates
app.use(express.urlencoded({ extended: true })); // body parser middleware
app.use(express.static('public')); // static files middleware
/* MIDDLEWARE ENDS */


/* ROUTES */

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
    const id = +req.params.id; // plus converts the string to a number
    const note = database.getNote(id); // finds the note from the array with the id

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
    const data = req.body; // get the title and content from the form
    database.addNote(data); // add the note to the database
    res.redirect("/notes"); // redirect to the notes page
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


const port = 8080; // start the server on port 8080
// listen for requests
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})