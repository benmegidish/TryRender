const express = require('express');
const cors = require('cors');
const http = require('http')
const { Server } = require('socket.io')
const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://second-socketio-trial.netlify.app/",
        methods: ["GET", "POST"],
    }
})
app.use('/', (req, res) => {
    res.send("connecting to socket...")
})
io.on("connection", (socket) => {
    console.log(`User Connected:  ${socket.id}`);

    socket.on("disconnect", () => {
        console.log("User Disconnected ", socket.id);
    });

    socket.on("send_message", (data) => {
        console.log(`user: ${data.author} sent a message at: ${data.time}`);
        socket.to(data.id).emit('recieve_message', data);
    })

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User: ${socket.id} joined Room: ${data}`);
    })
})
const port = 4000;
server.listen(port, () => {
    console.log(`server is runing on port ${port}`);
})