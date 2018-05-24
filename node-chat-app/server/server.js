const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public'); //returns a string
// console.log(__dirname+'/../public'); // In this case, the path is 'C:\Users\Maneesh_Singh01\Desktop\NodeJS-Tutorial\node-chat-app\server/../public'
// console.log(publicPath); // path is 'C:\Users\Maneesh_Singh01\Desktop\NodeJS-Tutorial\node-chat-app\public' so this is better than simple String path

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected!!');

    // socket.emit('newMessage', generateMessage('Admin','Welcome to chat app!!')); //emits the event to the user(socket) only.

    // socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined the chat!!'));

    socket.on('join', (params, callback) => {
        console.log('join was requested!!')
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required!!')
        }

        socket.join(params.room); //this socket will join params.room group e.g. 'Students' group
        //socket.leave('Students');
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        //io.emit -> io.to('Students').emit
        //socket.broadcast.emit ->socket.broadcast.to('Students').emit
        //socket.emit

        io.to(params.room).emit('updateUsersList',users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app!!')); //emits the event to the user(socket) only.
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined the chat!!`));

        callback();
    });

    socket.on('createMessage', (message, callback) => { //listening to a custom event from client
        console.log('createMessage', message);

        var user=users.getUser(socket.id);
        if(user && isRealString(message)){
            io.to(user.room).emit('newMessage', generateMessage(message.from, message.text)); //emits the event to everyone including the user(socket) who sent the message
        }       

        callback();

        // socket.broadcast.emit('newMessage', generateMessage(message.from,message.text)); //emits the event to everyone excluding the user(socket) who sent the message
    });

    socket.on('createLocationMessage', (coords) => { //listening to a custom event from client
        var user=users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }        
    });

    socket.on('disconnect', () => { //listening to an event from client
        console.log('User was disconnected!!');
        var user=users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUsersList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left!!`))
        }
    });
});

// app.listen(port,()=>console.log(`Server running on port ${port}`));
server.listen(port, () => console.log(`Server running on port ${port}`)); 