const jwt =require('jsonwebtoken');
require("dotenv").config();
const generateTokenAndSetCookie =(userId,res)=>{
    const token =jwt.sign({userId},process.env.JWT_TOKEN,{expiresIn: '15d'});

    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.MODE!=='development'
    });
}
module.exports=generateTokenAndSetCookie;   