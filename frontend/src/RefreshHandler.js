import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({setIsAuthenticated}) {
    const  location=useLocation();
    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setIsAuthenticated(true);
            if(location.pathname='/'||location.pathname('/login')||location.pathname('/signup')){
                navigate('/home',{replace:false})// if the token is present and the requested url is different then navigate to home and element replace set to false prevent it from rendering 
            }
        }
    },[location,navigate,setIsAuthenticated])


  return (
   null
  )
}

export default RefreshHandler
