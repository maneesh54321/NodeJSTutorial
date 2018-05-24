const {ObjectID}=require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

//Todo.findOneAndRemove()

Todo.findByIdAndRemove('5af164441981037b3f92633e').then((result)=>{
    console.log(result);
});