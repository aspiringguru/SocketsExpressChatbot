var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
//https://socket.io/docs/
var io = socket(server);
io.on('connection', (socket) => {
  //nb requires socket.io on client side to connect.
  console.log('made socket connection', socket.id);
  // Listen for events
  socket.on('chat', function(data){
      console.log("chat function: data=", data);
      io.sockets.emit('chat', data);
  });

});
