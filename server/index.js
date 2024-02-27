const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => `server running on port ${PORT}`);

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  }
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    console.log(userData._id);
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join game", (data) => {
    socket.join(data.roomId);
    console.log("User Joined Room: " + data.roomId);

    // Get the number of users in the room
    const room = io.sockets.adapter.rooms.get(data.roomId);
    const numUsers = room ? room.size : 0;

    console.log(`Number of users in room ${data.roomId}: ${numUsers}`);

    socket.in(data.roomId).emit("new user joined", { user: data.user });
  });
});
