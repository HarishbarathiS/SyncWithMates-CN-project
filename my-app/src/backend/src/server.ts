import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP server
const httpServer = createServer(app);

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
  const count = io.engine.clientsCount;
  console.log(count)

  // Handle chat messages
  socket.on("message", (message) => {
    console.log("Message received:", message);
    // Broadcast message to all clients
    // io.emit("message", {
    //   id: Date.now().toString(),
    //   text: message,
    //   userId: socket.id,
    //   timestamp: new Date()
    // });
  });

  socket.emit("message", {count});

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

  // Handle errors
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});


// Start server
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});