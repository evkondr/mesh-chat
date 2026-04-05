import socketAuthMiddleware from '@/middleware/socket.auth.middleware';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
});

io.use(socketAuthMiddleware);

const onlineUsers:Record<string, string> = {};

io.on('connection', (socket) => {
  console.log('User connected: ', socket.user.fullName);
  const userId = socket.user.id;
  onlineUsers[userId] = socket.id;
  io.emit('getOnlineUsers', Object.keys(onlineUsers));
  socket.on('disconnect', () => {
     console.log('User disconnected: ', socket.user.fullName);
     delete onlineUsers[userId];
     io.emit('getOnlineUsers', Object.keys(onlineUsers));
  });
});

export {
  io,
  app,
  server
};