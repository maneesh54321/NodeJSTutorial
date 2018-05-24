console.log('Starting app.js!');

const fs= require('fs');
// const os=require('os');
const _ = require('lodash');
const yargs=require('yargs');

const notes= require('./notes.js')


// var user=os.userInfo();

// console.log(user);

// fs.appendFile('greetings.txt','Hello world!');

/* fs.appendFile('greetings.txt', 'Hello '+user.username+'!',function(err){
    if(err){
        console.log('Unable to write to file.');
    }
}); */

//using node template!!!
/* fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}.`,function(err){
    if(err){
        console.log('Unable to write to file.');
    }
}); */

// var res=notes.addNote();
// console.log(res);

// console.log('Result: ', notes.add(9, -2));

// console.log(_.isString(true));
// console.log(_.isString('Maneesh'));

// var filteredArray=_.uniq(['Maneesh',1, 'Maneesh',1,2,3,4]);
// console.log(filteredArray);

// console.log(process.argv);

const title={
    describe:'Title of note',
    demand:true,
    alias:'t'
}

const body={
    describe:'Body of note',
    demand:true,
    alias:'b'
}

const argv=yargs.command('add', 'Add a new note',{
    title,
    body
})
.command('list','List all notes')
.command('read','Read a note',{
    title
})
.command('remove','Remove a note',{
    title
})
.help()
.argv;

// console.log('Yargs',argv);

// var command= process.argv[2];
//OR
var command=argv._[0];

// console.log('Command: '+ command);

if(command === 'add'){
    var note=notes.addNote(argv.title, argv.body);
    if(note){
        console.log('Added note!!')
        notes.logNote(note);
    } else{
        console.log('Note with same title already exist!!');
    }
} else if(command === 'list'){
    var noteList=notes.getAll();
    console.log(`Printing ${notes.length} note(s)`);
    noteList.forEach(note => notes.logNote(note));
} else if(command ==='read'){
    var note=notes.read(argv.title);
    if(note){
        console.log('Note found!!');
        notes.logNote(note);
    } else{
        console.log('Note not found!!');
    }
} else if(command ==='remove'){
    var removed=notes.remove(argv.title);
    var message=removed ? 'Note was removed!!' : 'Note not found!!';
    console.log(message);
} else{
    console.log('command not recognized');
}