const {MongoClient, ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to mongodb server!');
    }
    console.log('Connected to MongoDB server');

    //delete Many
    // db.collection('Todos').deleteMany({text:'Eat Lunch'}).then((res) => {
    //     console.log(res);
    // },(err)=>{
    //     console.log('Unable to delete');
    // });

    //delete One
    // db.collection('Todos').deleteOne({text:'Eat Lunch'}).then((result)=>{
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({name:'Maneesh'});

    db.collection('Users').findOneAndDelete({_id:new ObjectID('5aef457ecbafda1ae84f19dc')}).then((result)=>{
        console.log(result);
    },(err)=>{
        console.log('Unable to delete!!');
    });

    // db.close(); //closing the connection to mongodb
});