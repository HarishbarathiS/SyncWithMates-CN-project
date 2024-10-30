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

interface User {
  name: string;
  socket: any; // or Socket type if using socket.io
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
let room_id : string = "";
let name : string = "";
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  
  // Handle chat messages
  socket.on("message", (message) => {
    console.log("Message received:", message);
    room_id = message.room_id;
    name = message.name;

    if(message.type === "join"){


      if(!rooms.has(room_id)){
        rooms.set(room_id, new Set());
      }

      if(!rooms.get(room_id)?.has({name, socket})){
        rooms.get(room_id)?.add({name, socket});
        broadcastUserCount(room_id);
      }

    }

    // console.log(rooms.size);

    if (message.type === "leave" && room_id && rooms.has(room_id)) {
      // Remove the WebSocket from the room on leave
      rooms.get(room_id)?.delete({name, socket});
      broadcastUserCount(room_id);
    }
    
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    console.log(rooms.get(room_id));
    
    if (rooms.has(room_id)) {
      const room = rooms.get(room_id) || new Set();
      for (const user of room) {
        if (user.socket === socket) {
          room.delete(user);
          break;
        }
      }
      if (rooms.get(room_id)?.size === 0) {
        rooms.delete(room_id);
      } else {
        broadcastUserCount(room_id);
      }
    }
  });

  // Handle errors
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

function broadcastUserCount (room_id : string) {
  const userCount = rooms.get(room_id)?.size || 0;
  const userNames = [...rooms.get(room_id) || []].map(user => user.name);
  rooms.get(room_id)?.forEach((client) => {
    client.socket.emit("userCount", { type: "UserCount", userCount });
    client.socket.emit("userName", {type : "UserName", userNames})
  });
}


// Start server
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});