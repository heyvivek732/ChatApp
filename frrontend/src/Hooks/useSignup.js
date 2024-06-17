import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup=()=>{
    const [loading,setLoading]=useState(false);
    const {setAuthUser} = useAuthContext();
    const signup = async({fullName,username,password,confirmPassword,gender})=>{
        const success=handlerErrorCheck(fullName,username,password,confirmPassword,gender);
        if(!success)return;
        setLoading(true);
        try{
            const res=await fetch('/api/v1/auth/signup',{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify({fullName,username,password,confirmPassword,gender})
            })

            const output=await res.json();
           if(output.error){
               console.log("Error while Data Checking")
            throw new Error(output.error)
           }
           localStorage.setItem("chat-app",JSON.stringify(output));
           setAuthUser(output);

        }
        catch(error){
            toast.error(error.message);
        }

    }
    return {loading, signup};
};

export default useSignup

const handlerErrorCheck=(fullName,username,password,confirmPassword,gender)=>{
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("please fills the Field")
        return false;
    }
    if(password!==confirmPassword){
        toast.error('Password do not match')
        return false;
    }
    if(password.length<6){
        toast.error("Password must 6 character")
        return false;
    }
    return true;
}