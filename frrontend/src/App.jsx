import { useState } from 'react';
import './App.css'
import Login from './Pages/Login/Login';
import Signup from './Pages/SignUp/Signup';
import Home from './Pages/Home/Home';
import { Route,Routes, Navigate } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext';
function App() {
  const [count, setCount] = useState(0)
  const {authUser} = useAuthContext();

  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
          <Route path='/' element={authUser?<Home/>:<Navigate to={'/login'}/>}/>
          <Route path='/Login' element={authUser?<Navigate to={'/'}/>:<Login/>}/>
          <Route path='/signup' element={authUser?<Navigate to='/'/>:<Signup/>}/>
        </Routes>
        <Toaster/>
      </div>
    </>
  )
}

export default App
