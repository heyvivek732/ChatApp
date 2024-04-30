import { useState } from 'react';
import './App.css'
import Login from './Pages/Login/Login';
import Signup from './Pages/SignUp/Signup';
import Home from './Pages/Home/Home';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center'>
        <Home/>
      </div>
    </>
  )
}

export default App
