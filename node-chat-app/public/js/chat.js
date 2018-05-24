var socket = io(); //open a websocket and keep that connection open

(function (socket) {
    "use strict";

    socket.on('connect', function () { //arrow functions are not supported in mobiles and some browsers
        console.log('connected to server!!');

        var params=$.deparam(window.location.search);

        socket.emit('join',params,function(err){
            if(err) {
                alert(err);
                window.location.href= '/';
            } else{
                console.log("No error");
            }
        });
    });

    function scrollToBottom(){
        var messages=$('#messages');
        var newMessage=messages.children('li:last-child');

        var clientHeight=messages.prop('clientHeight'); //the height of the #messages div which is visible
        var scrollTop=messages.prop('scrollTop'); //the height from top which has been scrolled...initially it is 0.
        var scrollHeight=messages.prop('scrollHeight'); //the height of #messages div initially equal to client height in this case...increase when new messages cross the initial scroll height(becoz height of #messages also increases)
        var newMessageHeight=newMessage.innerHeight(); // height of last li element inside #messages as mentioned above
        var lastMessageHeight=newMessage.prev().innerHeight(); //height of second last li element inside #messages.
        // console.log('clientHeight: '+clientHeight); //606px (768-(taskbarheight+messageInputArea+chrometopbarHeight+etc) in this desktop
        // console.log('scrollTop: '+scrollTop);
        // console.log('scrollHeight: '+scrollHeight);
        // console.log('newMessageHeight: '+newMessageHeight);
        // console.log('lastMessageHeight: '+lastMessageHeight);
        if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight){
            // console.log('scroll');
            messages.scrollTop(scrollHeight);
        }
    
    }

    var messageTemplate=$('#message-template').html();
    socket.on('newMessage', function (message) {
        var formattedTime=moment(message.createdAt).format('h:mm a');
        var html= Mustache.render(messageTemplate,{
            text:message.text,
            from:message.from,
            createdAt:formattedTime
        });

        $('#messages').append(html);
        scrollToBottom();
    });

    var locationMessageTemplate=$('#location-message-template').html();
    socket.on('newLocationMessage', function (message) {
        var formattedTime=moment(message.createdAt).format('h:mm a');
        var html=Mustache.render(locationMessageTemplate,{
            from:message.from,
            createdAt:formattedTime,
            url:message.url
        });

        $('#messages').append(html);
        scrollToBottom();
    });

    socket.on('disconnect', function () {
        console.log('Disconnected from server');
    });

    socket.on('updateUsersList', function(users){
        console.log('Users list', users);
        var ol= $('<ol></ol>');

        users.forEach(function(user){
            ol.append($('<li></li>').text(user));
        });

        $('#users').html(ol);
    });

    $('#message-form').on('submit', function (e) {
        e.preventDefault();

        var messageTextbox=$('[name=message]');

        socket.emit('createMessage', {
            text: messageTextbox.val()
        }, function () {
            messageTextbox.val('');
        });
    });

    var locationButton = $('#send-location');

    locationButton.on('click', function () {
        if (!navigator.geolocation) {
            return alert('Geolocation not supported by your browser!!');
        }

        locationButton.attr('disabled','disabled').text('Sending location');

        navigator.geolocation.getCurrentPosition(function (position) {
            locationButton.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function (err) {
            alert('Unable to fetch location.');
            locationButton.removeAttr('disabled').text('Send location');
        });
    })

})(socket);