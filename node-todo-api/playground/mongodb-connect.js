// const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID}=require('mongodb');  //refer to below de-structuring example

//ES6 de-structuring
// var user={name:'Maneesh',age:25};
// var {name}=user; // creates a new variable 'name' and copy the value from user's property 'name'.
// console.log(name); //Maneesh

// var obj= new ObjectID(); //creates id for the document in mongodb, ObjectID is type of the document's field '_id'. 
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to mongodb server!');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({ // 'Todos' collection will be created on the fly.
    //     text:'Something to do',
    //     completed:false
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to inser todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    //Insert data
    db.collection('Users').insertOne({
        //_id:123, //custom id else default id will be provided which is a combination of timestamp, machine identifier, process id and a random number.
        name:'Maneesh',
        age:'25',
        location:'Bengaluru'
    },(err,result)=>{
        if(err) {
            return console.log('Unable to insert user', err);
        }
        console.log(JSON.stringify(result.ops,undefined,2)); // .ops constains the data inserted into mongodb.
        // console.log(result.ops[0]._id.getTimestamp()); //can be used to get the timestamp of a document creation.
    })

    db.close(); //closing the connection to mongodb
});