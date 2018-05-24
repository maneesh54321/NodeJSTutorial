const {MongoClient, ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to mongodb server!');
    }
   
    // var find=db.collection('Todos').find(); //.find() returns a pointer to the collection like iterator in java

    // var arr=find.toArray(); //.toArray() returns a promise which can result in an array of all documents in the collection.

    // arr.then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // }, (err) => {
    //     console.log('Unable to fetch todos',err);
    // });

    //filter documents based on fields
    // db.collection('Todos').find({
    //     completed:false
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err) => {
    //     console.log('Unable to fetch todos',err);
    // });

    db.collection('Todos').find({
        // _id: '5aeefba9e077d8253016e625'  //this won't work since _id is an ObjectID's object
        _id: new ObjectID('5aeefba9e077d8253016e625')
    }).toArray().then((docs)=>{
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
    },(err) => {
        console.log('Unable to fetch todos',err);
    });

    //counting number of documents in the collection
    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count ${count}`);
    // },(err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.close();
});