const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 4000
const socket = require('socket.io')


// app.get('/' , (req , res)=>{

//    res.send('hello from simple server :)')

// })

app.use(express.static('public'));


const server = app.listen(port , ()=> console.log('... Server is up and running on port : ' + port))

//Setting up Socket
var io = socket(server);

io.on('connection', (socket)=>{
    console.log('New user Connected id:',socket.id);

    socket.on('chat', (data)=>{
        io.sockets.emit('chat', data);

    });

    socket.on('chat', (data) => {
        socket.broadcast.emit('single', data)
    });

    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data)
    });
    // socket.on('disconnect', ()=>{
    // //Listening to a disconnection
    //     console.log("User disconnected");
    // });
})
