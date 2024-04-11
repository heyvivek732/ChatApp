const express= require("express");
const app=express();
const cookieParser =require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
const port=process.env.PORT || 5000;

const authRoutes= require('./routes/auth.route');
const messageRoutes =require('./routes/message.routes');
const userRouter=require('./routes/user.route');
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/messages',messageRoutes);
app.use('/api/v1/users',userRouter);

app.listen(port,(req,res)=>{

})

const connectdb =require('./Config/database');
connectdb();
