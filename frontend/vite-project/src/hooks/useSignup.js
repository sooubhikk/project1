

import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
   const [loading,setLoading]= useState(false);
   const {setAuthUser} = useAuthContext();
   const signup = async ({fullname,username,password,confirmPassword,gender}) => {
    const success = handleInputErrors({fullname,username,password,confirmPassword,gender})
    if(!success) return;
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup",{
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({fullname,username,password,confirmPassword,gender})
      })

        const data = await res.json();
        if(data.error){
          throw new error(data.error)
        }

        //local storage
        localStorage.setItem("chat-user",JSON.stringify(data))

        //context
        setAuthUser(data);

    } catch (error) {
      toast.error(error.message)
    } finally {
       setLoading(false);
   }
}
   return {signup,loading};
}
export default useSignup


function handleInputErrors({fullname,username,password,confirmPassword,gender}) {
  if(!fullname || !username || !password || !confirmPassword || !gender){
    toast.error('Please fill all the fields');
    return false;
  }
  if(password!=confirmPassword){
    toast.error('Passwords do not match');
    return false;
  }
  if(password.length < 6){
    toast.error('Password must be at least 6 characters long');
    return false;
  }

  return true;
}
