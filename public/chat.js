// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
//these id's match the id's in index.html we need to capture.
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');


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

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});


// Listen for events
socket.on('chat', function(data){
    //function chat matches function in index.js
    console.log("chat function: data.handle=",data.handle, ", data.message=", data.message);
    //id output defined in index.html
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    feedback.innerHTML = "";
});

socket.on('typing', function(data){
    //function typing matches function in index.js
    console.log("typing function, data = ", data);
    //id feedback defined in index.html
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
