import React, { useEffect, useState } from 'react'
import useConversations from '../zustand/useConversations';
import toast from 'react-hot-toast';

const useGetMessages = () => {
   const [loading,setloading] =useState(false);
   const {messages,setMessages,selectedConversation} = useConversations();
 
   useEffect(()=>{
    const getMessages=async()=>{
        setloading(true);
        try {
            const res =await fetch(`/api/v1/messages/${selectedConversation._id}`);
              if (!res.ok) {
                throw new Error('Message not found');
              }
            const data =await res.json();
            if(data.error) throw new Error(data.error);
            setMessages(data);
        } catch (error) {
            toast.error(error.message);
        }
        finally{
            setloading(false);
        }
     }
     if(selectedConversation?._id)getMessages();
   },[selectedConversation?._id,setMessages])
   return { loading, messages }
}

export default useGetMessages