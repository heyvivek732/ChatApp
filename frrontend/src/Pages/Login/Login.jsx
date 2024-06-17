import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../Hooks/useLogin';

const Login = () => {
  const [formData,setFormData] = useState({username:'',password:''});
  const {loading,login} = useLogin();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    await login(formData.username,formData.password);
  }

  return (
    <div className='flex flex-col item-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-700 shadow-sm shadow-black'>
         <h1 className='text-3xl font-semibold text-center text-gray-300'>
            Login
         </h1>
         <form onSubmit={handleSubmit}>
            <div>
               <label className='label p-2'>
                <span className='text-base label-text'>Username</span>
               </label>
               <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10'
               value={formData.username}
               onChange={(e)=>setFormData({...formData,username:e.target.value})}/>
            </div>
            <div>
            <label className='label p-2'>
                <span className='text-base label-text'>Password</span>
               </label>
               <input type="text" placeholder='Enter your password' className='w-full input input-bordered h-10'
               value={formData.password}
               onChange={(e)=>setFormData({...formData,password:e.target.value})}/>
            </div>
            <Link to="/signup" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
              {"Don't"} have an account?
            </Link>
            <div className='mt-5'>
              <button className='btn btn-block btn-sm mt-2' disabled={loading}>
                {loading?<span className='loading loading-spinner'></span>:"login"}</button>
            </div>
         </form>
        </div> 
    </div>
  )
}

export default Login