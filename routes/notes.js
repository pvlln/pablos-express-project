// import router
const notes = require('express').Router();
// import uuid random id generator
const {v4: uuidv4} = require('uuid');
// import functions
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');

// async request to load notes onto page
notes.get('/', async(req,res) => {
    const notes = await readFromFile('./db/db.json');
    res.json(JSON.parse(notes));
});

// async request to post onto notes db
notes.post('/', async(req,res) => {
    const { title, text } = req.body || {};
    if (title && text){
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else{
        res.status(400).json("Invalid note");
    }
})

// notes.delete('/:id', async(req,res) => {
//     const noteId = req.params.id;
//     const data = await readFromFile('./db/db.json');
//     const jsonRes = res.json(JSON.parse(data));
//     json.filter((jsonRes) => noteId)
// })

module.exports = notes;