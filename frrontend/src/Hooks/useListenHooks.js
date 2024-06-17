import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversations from '../zustand/useConversations';
import noti from '../assets/sound/noti.mp3';
const useListenHooks = () => {
   const {socket} =useSocketContext();
   const {messages,setMessages} = useConversations();

   useEffect(()=>{
     socket?.on("newMessage",(newMessage)=>{
        newMessage.shouldShake=true;
        const sound = new Audio(noti);
        sound.play();
        setMessages([...messages,newMessage]);
     })
     return ()=>socket?.off("newMessage");
   },[socket,setMessages,messages])
}

export default useListenHooks