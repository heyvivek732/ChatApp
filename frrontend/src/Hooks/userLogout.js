import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

     const useLogout= ()=>{
    const [loading,setLoading] = useState(false);
    const {setAuthUser} =useAuthContext();
    const logout=async()=>{
        setLoading(true);

        try{
            const res = await fetch("/api/v1/auth/logout",{
                method:"GET",
                headers: { "Content-Type":"application/json"},
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error ${res.status}: ${errorText}`);
            }

            const output = await res.json();

            if (output.error) {
                throw new Error(output.error);
            }

            localStorage.removeItem("chat-user");
            setAuthUser(null);
            toast.success("Successfully logged out");
        } catch (error) {
            toast.error(error.message || "An error occurred while logging out");
            console.error("Error during logout:", error);
        } finally {
            setLoading(false);
        }
    }
   return {loading,logout}
}
export default useLogout;