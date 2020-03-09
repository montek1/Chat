
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var usersCount = 1;
var users = [];
var username;
var socketsArr = [];


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    usersCount = usersCount + 1;
    console.log('user' + socket.id + 'connected');

});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        var firstWord = msg.split(' ')[0];
        if (firstWord == '/nickcolor'){
            console.log("color change: yes");
        }

        console.log('message: ' + msg);
        console.log('message2: ' + firstWord);

    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){

        socketsArr.push(socket.id);
        var socketNum = socket.id.substring(1,7);

        io.emit('chat message', getTime() + 'you' + giveUsername() + socketNum + ': ' + msg);

        console.log('THIS IS SOCKET ID: ' + socket.id);
        console.log("socket array contents: "+ socketsArr);

    });
});

    function getTime(){
        var date = new Date();
        var dateString = date.toDateString();
        var time = date.toLocaleTimeString();
        return time;
    }

    function giveUsername(){
        //var numOfUsers = users.length;
        var usernamee = "username";
        users.push(usernamee);

        return usernamee;
    }