const {ObjectID}=require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// var id='5af04b795bdef61660417267';

// if(!ObjectID.isValid(id)){
//     console.log('Id is not valid!');
// }

// Todo.find({ //result in an array, since it is made to get multiple results
//     _id: id
// }).then((todos) => {
//     console.log('Todos',todos)
// });

// Todo.findOne({ //first matching result
//     _id:id
// }).then((todo)=>{
//     console.log('Todo',todo);
// });

// Todo.findById(id).then((todo)=>{ //get document by id
//     if(!todo){
//         return console.log('Id not found!!');
//     }
//     console.log('Todo by id', todo);
// }).catch((e)=>{console.log(e)});

var userId='5af015434c4e792dd8d755da';
User.findById(userId).then((user)=> {
    if(!user){
        return console.log('User Id not found!!');
    }
    console.log('User by id',user);
}).catch((e)=>console.log(e));