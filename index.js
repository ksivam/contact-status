
var express = require('express');
var app = express();
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);

var contacts = {
    krishnas: 'Offline',
    discovery: 'Offline',
    rover: 'Offline'
};

app.use('/public', express.static('public'));
app.use('/lib', express.static('bower_components'));

app.get('/', function(req, rsp){
    rsp.sendFile(__dirname + '/index.html');
});

io.use(function(socket, next){
    var userName = socket.handshake.query.userName;
    if(!!userName) {
        contacts[userName] = 'Online';
    }

    return next();
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    io.emit("contacts", contacts);
});

httpServer.listen(2121, function(){
    console.log('listening on *:2121');
});
