import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoSearch } from "react-icons/io5";
import useConversations from '../../zustand/useConversations';
import useGetConversations from '../../Hooks/useGetConversations';
const SearchInput = () => {
  const [search,setSearch] = useState("");
  const {setSelectedConversation} = useConversations();
  const {conversations } = useGetConversations();

  const handleSubmit=(e)=>{
    console.log("Submittedd")
    e.preventDefault();
    if(!search)return;
    if(search.length<3)return toast.error("Enter At Least 3 char long");

    const conversation = conversations.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()));
    
    if(conversation){
      setSelectedConversation(conversation);
      setSearch("");
    }
    else return toast.error("User Not found")
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center justify-center gap-2'>
        <input type="text" placeholder='Search...' className='input input-bordered rounded-full' 
        value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <button   className='btn btn-circle bg-sky-500 text-white'>
            <IoSearch/>
        </button>
    </form>
  )
}

export default SearchInput