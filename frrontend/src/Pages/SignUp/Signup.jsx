import React from 'react'
import CheckBox from './CheckBox'

const Signup = () => {
  return (
    <div className='flex flex-col item-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-700 shadow-sm shadow-black'>
         <h1 className='text-3xl font-semibold text-center text-gray-300'>
            SignUp
         </h1>
         <form action="">
            <div>
               <label className='label p-2'>
                <span className='text-base label-text'>Full Name</span>
               </label>
               <input type="text" placeholder='Full Name' className='w-full input input-bordered h-10'/>
            </div>
            <div>
            <label className='label p-2'>
                <span className='text-base label-text'>Username</span>
               </label>
               <input type="text" placeholder='Enter Username' className='w-full input input-bordered h-10'/>
            </div>
            <div>
            <label className='label p-2'>
                <span className='text-base label-text'>Password</span>
               </label>
               <input type="text" placeholder='Enter password' className='w-full input input-bordered h-10'/>
            </div>
            <div>
            <label className='label p-2'>
                <span className='text-base label-text'>Confirm Password</span>
               </label>
               <input type="text" placeholder='Confirm password' className='w-full input input-bordered h-10'/>
            </div>
            <CheckBox/>
            <a href="#" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
              Already have an account?
            </a>
            <div className='mt-5'>
              <button className='btn btn-block btn-sm mt-2'>Signup</button>
            </div>
         </form>
        </div> 
    </div>
  )
}

export default Signup