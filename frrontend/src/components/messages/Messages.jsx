import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../Hooks/useGetMessages'
import MessageSkeleton from '../Skelton/Skelton';
import useListenHooks from '../../Hooks/useListenHooks';

const Messages = () => {
  const {messages,loading} =useGetMessages()
  useListenHooks();
  const lastUseRef = useRef();

  useEffect(()=>{
    setTimeout(()=>{
       lastUseRef.current?.scrollIntoView({behavior:"smooth"});
    },50)
  },[messages])
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && messages.length>0 && messages.map((message)=>(
         <div key={message._id} ref={lastUseRef}><Message  message={message}/></div>
      ))}

      {loading &&[...Array(3)].map((_,idx)=> <MessageSkeleton key={idx}/>)}
      {!loading && messages.length===0 && (<p className='text-center'>Send Messsage to Start Conversation</p>)}
    </div>
  )
}

export default Messages