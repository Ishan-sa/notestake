const express = require('express');
const app = express();
const database = require('./database');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const notes = database.getNotes();
    res.render("notes.ejs", {
        notes
    });
})


app.get("/notes", (req, res) => {
    const notes = database.getNotes();
    res.render("notes.ejs", {
        notes
    });
});

app.get("/notes/:id", (req, res) => {

    // plus converts the string to a number
    const id = +req.params.id;
    // finds the note from the array with the id
    const note = database.getNote(id);
    if (!note) {
        res.status(404).render("note404.ejs")
        return
    }
    res.render("singleNote.ejs", {
        note
    })
    // res.send(note);
})

app.get("/createNote", (req, res) => {
    res.render("createNote.ejs");
});

app.post("/notes", (req, res) => {
    const data = req.body;
    database.addNote(data);
    res.redirect("/notes");
})


// app.post("/createNote", (req, res) => {
//     newNote = database.addNote(req.body.title, req.body.contents);
//     res.redirect(`/notes`);
// });

app.post("/notes/:id/delete", (req, res) => {
    const id = +req.params.id
    database.deleteNote(id)
    res.redirect("/notes");
})




app.use(express.static('public'));

const port = 8080;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})