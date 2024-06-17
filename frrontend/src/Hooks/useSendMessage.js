import React, { useEffect, useState } from 'react'
import useConversations from '../zustand/useConversations';
import toast from 'react-hot-toast';

const useSendMessage = () => {
   const [loading,setLoading] = useState(false);
   const {messages,setMessages,selectedConversation} = useConversations();

    const sendMessage= async(message)=>{
    setLoading(true);
    try {
        const res=await fetch(`/api/v1/messages/send/${selectedConversation._id}`,{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify({message})
        });
        const data=await res.json();
        if(data.error)throw new Error(data.error);
        console.log("Console Data:",JSON.stringify(data))
        setMessages([...messages,data])
    } catch (error) {
        toast.error(error.message);
    }finally {
        setLoading(false)
    }
      }
   return  {loading,sendMessage};
}

export default useSendMessage