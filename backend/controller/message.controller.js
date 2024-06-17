const Message=require("../models/message.model");
const User =require("../models/user.models");
const conversationModel = require("../models/conversation.model");
const { getRecievedUserId ,io} = require("../socket/socket");
exports.sendMessage=async(req,res)=>{
    try {
        const {message}=req.body;
        const {id: receiverId}=req.params;
        const senderId = req.user._id;

        let conversation = await conversationModel.findOne({
            participants:{$all:[senderId,receiverId]}
        })
        
        if(!conversation){
            conversation=await conversationModel.create({
                participants:[senderId,receiverId],
            })
        }
        const newMessage =new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

       await Promise.all([conversation.save(),newMessage.save()]);

       const receiverSocketId =getRecievedUserId(receiverId);
       if(receiverId!=undefined){
        io.to(receiverSocketId).emit("newMessage",newMessage);
       }

        res.status(200).json(newMessage);
    } catch (error) { 
        return res.status(500).json({error:"Error while sending message"})
    }
}

exports.getMessage =async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId =req.user._id;
        const conversation = await conversationModel.findOne({
            participants:{$all:[senderId,userToChatId]},
        }).populate("messages");

        if(!conversation)return res.status(200).json([]);
        const message=conversation.messages 
        res.status(200).json(message);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            error:error.message,
            message:"While While getting Message"
        })
    }
}