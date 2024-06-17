const {Server} =require('socket.io');
const http =require('http')
const express =require('express');
const cors = require('cors')
const app= express();

const httpserver =http.createServer(app);
 const getRecievedUserId = (receiverId)=>{
  return userSocketMap[receiverId];
}
const userSocketMap ={}; // {userId:socketId}
const io=new Server(httpserver,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"],
    }
})
io.on('connection',(socket)=>{
    console.log("User Connected",socket.id);

    const userId =socket.handshake.query.userId;
    if(userId!=undefined)userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers",Object.keys(userSocketMap)); // it used to send events to all connected user

    socket.on('disconnect',()=>{
        console.log('Usern Disconnected',socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})

module.exports ={app,io,httpserver,getRecievedUserId};