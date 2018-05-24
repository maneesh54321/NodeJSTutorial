const express=require('express');

var app=express();

app.get('/',(req,res) => {
    // res.status(200).send('Hello world!');
    res.status(404).send({
        error:'Page not found.',
        name: 'Todo app 1.0'
    });
});

app.get('/users',(req,res)=>{
    var users=[
        {
            name:'Maneesh',
            age:25
        },
        {
            name:'Vikas',
            age:26
        },
        {
            name:'Hari',
            age:24
        }
    ];
    res.status(200).send(users);
});

app.listen(3000);

module.exports.app=app;