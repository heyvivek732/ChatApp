const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        length:50,
    },
    username:{
        type:String,
        required:true,
        length:50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:""  
    }

},{timestamps:true})

module.exports=mongoose.model("User",userSchema);   