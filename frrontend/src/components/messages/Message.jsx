import React from 'react'
import { useAuthContext } from '../../context/AuthContext';
import useConversations from '../../zustand/useConversations';
import { extractTime } from '../../Utils/extractTime';

const Message = ({message}) => {
  const {authUser} =useAuthContext();
  const {selectedConversation} =useConversations();

  const fromMe = message.senderId === authUser._id;
  const fromattedTime = extractTime(message.createdAt)
  const chatClassName=fromMe? 'chat-end' : 'chat-start';
  const profilePic=fromMe ?authUser.profilePic:selectedConversation?.profilePic;
  const bubbleBgclr=fromMe ?'bg-blue-500':"";
  const classShake = message.shouldShake?"shake":"";

  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilePic} alt="404" />
            </div>

        </div>
        <div className={`chat-bubble text-white  ${bubbleBgclr} ${classShake} `}>{message.message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{fromattedTime}</div>
    </div>
  )
}

export default Message;