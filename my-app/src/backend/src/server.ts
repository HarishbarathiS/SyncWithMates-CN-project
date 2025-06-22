import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server as SocketIOServer, Socket } from "socket.io";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP server
const httpServer = createServer(app);

let hostId: string | null = null;

interface User {
  name: string;
  socket: Socket; // or Socket type if using socket.io
}

const rooms = new Map<string, Set<User>>();

// Create Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Handle WebRTC signaling
  socket.on("offer", ({ offer, userId, roomId }) => {
    // Forward the offer to the specific user
    rooms.get(roomId)?.forEach(user => {
      if (user.name === userId) {
        user.socket.emit("offer", {
          offer,
          userId: socket.data.name
        });
      }
    });
  });

  socket.on("answer", ({ answer, userId, roomId }) => {
    // Forward the answer to the specific user
    rooms.get(roomId)?.forEach(user => {
      if (user.name === userId) {
        user.socket.emit("answer", {
          answer,
          userId: socket.data.name
        });
      }
    });
  });

  socket.on("iceCandidate", ({ candidate, userId, roomId }) => {
    // Forward the ICE candidate to the specific user
    rooms.get(roomId)?.forEach(user => {
      if (user.name === userId) {
        user.socket.emit("iceCandidate", {
          candidate,
          userId: socket.data.name
        });
      }
    });
  });

  

  // const count = io.engine.clientsCount;
  // console.log(count);
  // Handle chat messages
  socket.on("message", (message) => {
    console.log("Message received:", message);
     const room_id = message.room_id;
     const name = message.name;
    socket.data.room_id = room_id;
    socket.data.name = name;
    if(message.type === "join"){


      if(!rooms.has(socket.data.room_id)){
        rooms.set(socket.data.room_id, new Set());
      }
      
      if(!rooms.get(socket.data.room_id)?.has({name, socket})){
        rooms.get(socket.data.room_id)?.add({name, socket});
        broadcastUserCount(socket.data.room_id);
        broadCastUserJoined(socket.data.room_id,socket.data.name);
      }
      console.log(rooms);
    }

    // Handle existing message types...
    if (message.type === "message" && name) {
      broadcastMessage(message.room_id, message.data.content, message.name);
    }

    // console.log(rooms.size);

    if (message.type === "leave" && socket.data.room_id && rooms.has(socket.data.room_id)) {
      // Remove the WebSocket from the room on leave
      rooms.get(socket.data.room_id)?.delete({name, socket});
      broadcastUserCount(socket.data.room_id);
    }
    
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    //console.log(rooms.get(room_id));
    
    if (rooms.has(socket.data.room_id)) {
      const room = rooms.get(socket.data.room_id) || new Set();
      for (const user of room) {
        if (user.socket === socket) {
          console.log("hi")
          broadCastUserLeft(socket.data.room_id, socket.data.name)
          room.delete(user);
          break;
        }
      }
      if (rooms.get(socket.data.room_id)?.size === 0) {
        rooms.delete(socket.data.room_id);
      } else {
        broadcastUserCount(socket.data.room_id);
      }

      console.log(rooms)
    }
  });

  // Handle errors
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});


function broadcastMessage(room_id : string, data : string, name : string){
  console.log(data);
  console.log(rooms)
  console.log(name);
  rooms.get(room_id)?.forEach((client) => {
    client.socket.emit("ClientMessage", { type: "ClientMessgae", data , name});
  });
}

function broadcastUserCount (room_id : string) {
  const userCount = rooms.get(room_id)?.size || 0;
  const userNames = [...rooms.get(room_id) || []].map(user => user.name);
  rooms.get(room_id)?.forEach((client) => {
    client.socket.emit("userCount", { type: "UserCount", userCount });
    client.socket.emit("userNames", {type : "UserName", userNames})
  });
}

function broadCastUserJoined(room_id : string, name : string){
  console.log(room_id);
  rooms.get(room_id)?.forEach((client) => {
    client.socket.emit("userJoined", { type: "UserJoined", name });
  });
}

function broadCastUserLeft(room_id : string, name  : string){
  console.log("bye");
  rooms.get(room_id)?.forEach((client) => {
    client.socket.emit("userLeft", {type : "UserLeft", name});
  });
}


// Start server
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});