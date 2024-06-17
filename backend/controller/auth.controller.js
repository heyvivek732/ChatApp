const express =require("express");
const User =require('../models/user.models');
const bcryptjs =require('bcryptjs');
const jwt =require("jsonwebtoken")
const {generateTokenAndSetCookie}=require("../utils/generateTokens");
require("dotenv").config();
exports.loginController = async(req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const isCorrectPass= await bcryptjs.compare(password,user?.password || "");
        if(!user || !isCorrectPass){
            return res.status(400).json({error:"Invalid username or password"});
        }
       
            generateTokenAndSetCookie(user._id,res)
            
        res.status(200).json({
            success:true,
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            gender:user.gender,
            profilePic:user.profilePic,
            message:"Succefully Login"
        })
        console.log("Hellow")
    } catch (error) {
        console.log("hwllo");
        return res.status(500).json({error:error.message});
    }
}

exports.singnUpController =async(req,res)=>{
    
    try {
        const  {fullName, username ,password, confirmPassword, gender} =req.body;

        if(password!==confirmPassword){
            return res.status(400).json({error:'password not Matched'})
        }
        const user =await User.findOne({username});
        if(user){
            
            return res.status(400).json({error:"Username already Exits"})
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword =await bcryptjs.hash(password,salt);
        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`

        const newUser =new User({
           fullName,
           username,
           password:hashPassword,
           gender,
           profilePic:gender ==='male'?boyProfilePic:girlProfilePic,
        })

        if(newUser){
             generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();

        res.status(200).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profilePic:newUser.profilePic,
        });
      }
      else return res.status(201).json({error:"Invalid User"}); 
    } catch (error) {
       res.status(501).json({
        success:false,
        error:error.message,
        message:"Error While Signup"
       });
    }
}
exports.logOutController = async(req,res)=>{
    try {
       res.cookie("jwt","",{maxAge:0});
       res.status(200).json({message:"Succefully Logout"})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error:"Error While a LogOut"});
    }
}
