import React, { useState } from 'react'
import CheckBox from './CheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../Hooks/useSignup';

const Signup = () => {
   const [formData, setFormData]=useState({fullName:'',username:'',password:'',confirmPassword:'',gender:""});
   const {loading,signup} =useSignup()
   const HandleSubmit=async(e)=>{
      e.preventDefault();
      await signup(formData);
   }
   const  HandlerGenderChange=(gender)=>{
      setFormData({...formData,gender});
   }
  return (
    <div className='flex flex-col item-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-700 shadow-sm shadow-black'>
         <h1 className='text-3xl font-semibold text-center text-gray-300'>
            SignUp
         </h1>
         <form  onSubmit={HandleSubmit}>
            <div>
               <label className='label p-2'>
                <span className='text-base label-text'>Full Name</span>
               </label>
               <input type="text" placeholder='Full Name' className='w-full input input-bordered h-10'
               value={formData.fullName} 
               onChange={(e)=>setFormData({...formData,fullName:e.target.value})}/>
            </div>
            <div>
            <label className='label p-2'>
                <span className='text-base label-text'
                 >Username</span>
               </label>
               <input type="text" placeholder='Enter Username' className='w-full input input-bordered h-10'
               value={formData.username}
               onChange={(e)=>setFormData({...formData,username:e.target.value})}/>
            </div>
            <div>
            <label className='label p-2'>
                <span className='text-base label-text'>Password</span>
               </label>
               <input type="text" placeholder='Enter password' className='w-full input input-bordered h-10'
               value={formData.password}
              onChange={(e)=>setFormData({...formData,password:e.target.value})}/>
            </div>
            <div>
            <label className='label p-2'>
                <span className='text-base label-text'>Confirm Password</span>
               </label>
               <input type="text" placeholder='Confirm password' className='w-full input input-bordered h-10'
               value={formData.confirmPassword}
               onChange={(e)=>setFormData({...formData,confirmPassword:e.target.value})}/>
            </div>

            <CheckBox onChangeCheckBox={HandlerGenderChange} selectedGender={formData.gender}/>
            <Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
              Already have an account?
            </Link>
            <div className='mt-5'>
              <button className='btn btn-block btn-sm mt-2'>Signup</button>
            </div>
         </form>
        </div> 
    </div>
  )
}

export default Signup