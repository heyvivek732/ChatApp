const jwt =require('jsonwebtoken');
const User =require("../models/user.models");
require("dotenv").config();
exports.protectRoute= async(req,res,next)=>{
  try {
      const token =req.cookies.jwt;
      console.log(token);
      if(!token)return res.status(400).json({error:"Unauthorized - No token Provided"});

      const decode = jwt.verify(token,process.env.JWT_TOKEN);
      if(!decode){
      return res.status(400).json({error:"Unauthorized- Invalid Token"})
      }
      const user =await User.findById(decode.userId).select("-password");

      if(!user)return res.status(400).json({error:"User not found"});

      req.user=user
      next();
  } catch (error) {
     console.error(error.message);
     return res.status(500).json({
        error:error.message,
        message:"Error in protected Route"
     });
  }
}