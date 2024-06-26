import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client';
export const socketContext=createContext();

export const useSocketContext = ()=>{
   return useContext(socketContext);
}
export const SocketContextProvider =({children})=>{
    const [socket,setSocket] = useState(null);
    const [userOnline,setUserOnline] =useState([]);
    const {authUser} = useAuthContext();
    
    useEffect(()=>{
        if(authUser){
            const socket = io("https://chatapp-o7p4.onrender.com",{
                query:{
                    userId:authUser._id,
                }
            });
            setSocket(socket);
            socket.on("getOnlineUsers",(users)=>{
                setUserOnline(users);
            })
            return ()=>socket.close();
        }else {
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[authUser])
  
    return (<socketContext.Provider value={{socket,userOnline}}>{children}</socketContext.Provider>)
}
