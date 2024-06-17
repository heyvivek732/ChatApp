const User =require("../models/user.models");

exports.getAllUsers=async(req,res)=>{
    try {
        // const users=await User.find({});     // It will fetched All data from the database
        const allusers=await User.find({ _id: { $ne: req.user._id } }).select('-password');
        if(!allusers)return res.status(400).json([]);  
        res.status(200).json(allusers);
    } catch (error) {
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

        return res.status(500).json({error:"Error While get One User"});
    }
}