var mongoose=require('mongoose');
// //without validations
// var Todo=mongoose.model('Todo',{  // schema/ORM , this .model return a constructor function e.g. Todo().
//     text:{
//         type:String
//     },
//     completed:{
//         type: Boolean
//     },
//     completedAt:{
//         type:Number
//     }
// });

//with validations
var Todo=mongoose.model('Todo',{  // schema/ORM , this .model return a constructor function e.g. Todo().
    text:{
        type:String, //even though the type is fixed to 'string' but this may work with number, boolean etc. (not object)
        required:true,
        minLength:1,
        trim:true
    },
    completed:{
        type: Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    },
    _creator:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
});

module.exports={Todo};