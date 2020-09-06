const fs = require('fs')
const chalk = require('chalk')

const addNotes = (title,  body)=>{
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=> note.title === title)
    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note Added!'))
    } else {
        console.log(chalk.red.inverse('Note Title Taken!'))
    }
    
}

const removeNotes = (title)=>{
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)=>note.title!==title)

    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else{
        console.log(chalk.red.inverse('No note found!'))
    }
}

const listNotes = ()=>{
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Your Notes!'))
    notes.forEach((note)=>{
        console.log(note.title)
    })
    
}

const readNote = (title)=> {
    const notes = loadNotes()
    const requiredNote = notes.find((note)=>note.title === title)
    if(requiredNote){
        console.log(chalk.blue.inverse(requiredNote.title))
        console.log(requiredNote.body)
    }else{
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = ()=>{
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e){
        return []
    }
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}