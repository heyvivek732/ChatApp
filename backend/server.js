const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const {app,httpserver} =require('./socket/socket.js')
require("dotenv").config();

__dirname=path.resolve();
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT || 5000;

const authRoutes = require('./routes/auth.route');
const messageRoutes = require('./routes/message.routes');
const userRouter = require('./routes/user.route');
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/users', userRouter);

app.use(express.static(path.join(__dirname,"/frrontend/dist")))
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"frrontend","dist","index.html")); 
})

httpserver.listen(port, (req, res) => {

})

const connectdb = require('./Config/database');
const { server } = require("./socket/socket");
const { stat } = require("fs");
connectdb();
