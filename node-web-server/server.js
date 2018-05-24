//ExpressJS
//npm install express --save
const express = require('express');

//Loading HandleBars
//npm install hbs@4.0.1 --save
const hbs=require('hbs');

const fs=require('fs');

const port= process.env.PORT || 3000;

var app= express();

//adding support for partials(parts of page that are reusable)
hbs.registerPartials(__dirname+'/views/partials')

// telling express what view engine we want to use
app.set('view engine','hbs'); //app.set sets key value pair for express, setting key 'view engine' to 'hbs'

// 'views' is the default directory of templates for express

//for serving static content (e.g. contents of 'public' folder here)
//registering middleware(using app.use), teaching express how to use static content
// app.use(express.static(__dirname+'/public')/* <= middle ware function*/);

// Order of app.use matters a lot. If the above app.use is not commented then we will able to access the static contents. Move it below this middleware so that the static content is also not accessible anymore
// app.use((req,res,next) => {  //sending response ad not calling next() in this middleware function so no further processing is done on request.
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public')/* <= middle ware function*/);

app.use((req,res,next) => {
    var now = new Date().toString();

    var log=`${now} : ${req.method} ${req.url}`;

    console.log(log)
    fs.appendFile('server.log',log+ '\n', (err) => {
        if(err){
            console.log('Unable to append to file!!');
        }
    });

    next(); //tells the request to proceed further...if this is not called then the request will never be handled by the e.g. app.get handlers
});

// register handler helper which is a function and can be called from the handlebars directly e.g. {{getCurrentYear}}
hbs.registerHelper('getCurrentYear',() => {  //helper without argument
    return new Date().getFullYear();
})

// handler helper which can be called in hadlebars e.g. {{screamIt 'Welcome to my website'}} OR {{screamIt welcomeMessage}}
hbs.registerHelper('screamIt', (text) =>{ //helper with argument
    return text.toUpperCase();
})

//handles '/' after localhost:3000
app.get('/',(req,res) => {
    // res.send('<h1>Hello Express!</h1>');  // Sending string
    // res.send({  //Sending object
    //     name:'Maneesh',
    //     likes: [
    //         'Bikes','Sitting'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
        // currentYear: new Date().getFullYear()  //use handlebar helpers instead
    })
});

//handles localhost:3000/about
app.get('/about',(req,res) => {
    // res.send('About Page!');
    // res.render('about.hbs'); //res.render lets render any of the templates setup with current view engine
    res.render('about.hbs',{   // passing data to template
        pageTitle:'About Page',
        // currentYear: new Date().getFullYear()  //use handlebar helpers instead
    });
});

app.get('/projects',(req,res) => {
    res.render('projects.hbs', {
        pageTitle:'Projects'
    })
});

// /bad -send back json with errorMessage
app.get('/bad',(req,res) => {
    res.send({
        status:400,
        errorMessage:'Unable to handle request!'
    });
});


//listes on port 3000
app.listen(port,() =>{
    console.log(`Server is up on port ${port}`);
});