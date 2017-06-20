// Setup basic express server
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
users = [];


io.set('origins', 'localhost:*');


app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});




//Connect

io.on('connection', function(socket){
	console.log('a user connected');

	 socket.broadcast.emit('guest', 'guest is online');


	 //json from server
	 var foo = '{ "name": "Bob", "info": "This is JSON from server!" }';	
        JSON.stringify(foo);
	  socket.emit('news', foo);


//Send message	
  socket.on('chat message', function(msg){
  	io.emit('chat message', {msg: msg, user: socket.username});
    console.log(socket.username + ':' + ' ' + msg);
  });

//New User

socket.on('new user', function(data, callback) {
	callback(true);
	socket.username = data;
	users.push(socket.username);
	updateUsernames();
});

	function updateUsernames() {
		io.sockets.emit('get users', users);
	}


  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });



//disconnect
  socket.on('disconnect', function(){
  	 updateUsernames();
    console.log('user disconnected');
  });
});



http.listen(3000, function(){
	console.log('listening on *:3000');
});


