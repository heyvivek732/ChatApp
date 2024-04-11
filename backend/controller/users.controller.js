const User =require("../models/user.models");

exports.getAllUsers=async(req,res)=>{
    try {
        // const users=await User.find({});     // It will fetched All data from the database

        // when want filter data which is loggedin we filter based on logged in user
        const loggedInUser = req.user._id;
        const users=await User.find({_id:{$ne:loggedInUser}});
        if(!users)return res.status(400).json([]);  
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error:"Error while Fetching All Users"});
    }
}
exports.getOneUser=async(req,res)=>{
    try {
        const {id:user_id}=req.params
        const user = await User.findById(user_id);
        if(!user)return res.status(400).json({error:"User Not Found"});

        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error:"Error While get One User"});
    }
}