//Setting up socket.io Client
var socket = io.connect('http://localhost:4000');

var message = document.getElementById('message');
    handle = document.getElementById('handle'),
    send = document.getElementById('send'),
    feedback = document.getElementById('feedback'),
    output = document.getElementById('output');

    ///Emitting events

send.addEventListener('click', ()=>{
   socket.emit('chat',{
       message: message.value,
       handle: handle.value
   });
});

message.addEventListener('keypress', ()=>{
    socket.emit('typing', {
        handle: handle.value
    });
})

//Listen to Events
socket.on('chat', (data)=>{
    feedback.innerHTML = "";
    output.innerHTML += '<div class="chat-content"><p><strong>' + data.handle + ':</strong><br>' + data.message + '</p></div>';
    message.value="";
});



socket.on('typing', (data)=>{
    feedback.innerHTML ='<p><em>' + data.handle + ' is typing </em></p>';
    
})
// socket.on('single', (data) => {
//     output.innerHTML += '<div class="chat-left"><p><strong>' + data.handle + ':</strong><br>' + data.message + '</p></div>';

// })
