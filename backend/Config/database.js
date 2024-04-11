const mongoose =require('mongoose');
require("dotenv").config();
const URL =process.env.DB_URL;
const connectdb=async()=>{
  await mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true})
  .then(()=>console.log('Successfull Connnected'))
  .catch((error)=>console.log(error.message));
}

module.exports =connectdb;