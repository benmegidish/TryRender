const express = require('express');
const cors= require('cors');
const http= require('http')
const {Server}=require('socket.io')
const app=express();
app.use(cors());
const server =http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://https://socketio-trial.netlify.app/",
        methods:["GET","POST"]
    }      
})

io.on("connection",(socket)=>{
    console.log(`User Connected:  ${socket.id}`);

    socket.on("disconnect",()=>{
        console.log("User Disconnected ",socket.id);
    });
    
    socket.on("send_message",(data)=>{
        console.log(`user: ${data.author} sent a message at: ${data.time}`);
        socket.to(data.id).emit('recieve_message',data);
    })

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User: ${socket.id} joined Room: ${data}`);
    })
})

server.listen(4000,()=>{
    console.log('Server is running...');
})