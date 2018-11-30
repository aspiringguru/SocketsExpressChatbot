// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
//these id's match the id's in index.html we need to capture.
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');


// Emit events
//function(){ ... = callback function
btn.addEventListener('click', function(){
  socket.emit('chat', {
      //nb index.js has corresponding socket.on('chat'
      message: message.value,
      handle: handle.value
  });
  message.value = "";
});

// Listen for events
socket.on('chat', function(data){
    console.log("chat function: data.handle=",data.handle, ", data.message=", data.message);
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});
