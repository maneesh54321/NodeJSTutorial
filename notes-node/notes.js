console.log('starting notes.js!!');

// console.log(module);

// module.exports.age=25;

// module.exports.addNote=() =>{
//     console.log('addNote');
//     return 'New note';
// };


// module.exports.add=function(a, b){
//     return a + b;
// };

// module.exports.add= (a, b) => {
//     return a+b;
// };

const fs=require('fs');

var fetchNotes=() =>{
    try {
        var notesString=fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (error) {
        return [];
    }
};

var saveNotes= (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var logNote=(note) => {
    debugger;
    console.log('------------');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

var addNote=(title, body) => {
    var note={
        title,
        body
    }

    var notes=fetchNotes();

    var duplicateNote=notes.filter((note)=> note.title===title);

    if(duplicateNote.length===0){
        notes.push(note);
        saveNotes(notes);
        return note;    
    }
};

var getAll=() => {
    return fetchNotes();
};

var getNote=(title) =>{
    var notes=fetchNotes();
    var filteredNotes=notes.filter(note => note.title===title);
    return filteredNotes[0];
};

var removeNote=(title) =>{
    var notes=fetchNotes();
    var filteredNotes=notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);
    return notes.length!==filteredNotes.length;
};

module.exports={
    addNote,
    getAll,
    read:getNote,
    remove:removeNote,
    logNote
}