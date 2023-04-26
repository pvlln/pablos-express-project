const notes = require('express').Router();
const {v4: uuidv4} = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');

notes.get('/', async(req,res) => {
    const notes = await readFromFile('./db/db.json');
    res.json(JSON.parse(notes));
});

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

module.exports = notes;