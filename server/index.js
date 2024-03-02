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

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.emit("connection");
  socket.on("create room", (userData) => {
    const roomId = userData._id.toString();

    if (!io.sockets.adapter.rooms.has(roomId)) {
      socket.join(roomId);
      socket.emit("room created", true);
    } else {
      console.log(`Room ${roomId} already exists`);
    }
  });

  socket.on("join game", (data) => {
  const roomId = data.roomId;
  if (io.sockets.adapter.rooms.has(roomId)) {
    socket.join(roomId);
    const numUsers = io.sockets.adapter.rooms.get(roomId).size;
    console.log("User Joined Room: " + roomId);
    console.log(`Number of users in room ${roomId}: ${numUsers}`);

    io.to(roomId).emit("new user joined", { users: { host: roomId, guest: data.user._id }});
  } else {
    socket.emit("room does not exist");
  }
});

  socket.on("remove room", (data) => {
    const roomId = data._id;

    if (io.sockets.adapter.rooms.has(roomId)) {
      const socketsInRoom = io.sockets.adapter.rooms.get(roomId);

      if (socketsInRoom && socketsInRoom.size > 0) {
        for (const socketId of socketsInRoom) {
          const socketToDisconnect = io.sockets.sockets[socketId];

          if (socketToDisconnect) {
            socketToDisconnect.disconnect(true);
          }
        }
      }

      io.sockets.adapter.rooms.delete(roomId);

      socket.emit("room disconnected", false);

      console.log(`Room ${roomId} removed`);
    } else {
      socket.emit("room disconnected", { success: false });
      console.log(`Room ${roomId} does not exist`);
    }
  });

 
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  
  socket.on("disconnected user", (user) => {
    console.log(user);
  });
});
