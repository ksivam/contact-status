
var express = require('express');
var app = express();
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);


app.use('/public', express.static('public'));
app.use('/lib', express.static('bower_components'));

app.get('/', function(req, rsp){
    rsp.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.broadcast.emit('userConnected', 'a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('chatMessage', function(msg) {
        console.log('message: ' + msg);
        //socket.broadcast.emit('chatMessage', msg);
        io.emit('chatMessage', msg);
    });
});

httpServer.listen(2121, function(){
    console.log('listening on *:2121');
});
