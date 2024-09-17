import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
function Home() {
  const [loggedInUser,setLoggedInUser]=useState('');
  const [products,setProducts]=useState('');
  const navigate=useNavigate();
  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('LoggedInUser'))
  },[]);
  const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('LoggedInUser');
    handleSuccess("Logout Successfully");
    setTimeout(()=>{
      navigate('/login')
    },1000)
  }
  const fetchProducts=async()=>{
    try{
      const url="https://deploy-mern-app-1-api-sigma.vercel.app/products";
      const response=await fetch(url,{
        method:"GET",
        headers: {
          'Content-Type': 'application/json',
          'authorization':localStorage.getItem('token')
        },
      })
      const result=await response.json();
      setProducts(result);
      
    }
    catch(error){

    }
  }
  useEffect(()=>{
   fetchProducts();
  },[])
  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>{
       products&&products?.map((item,index)=>(
          <ul key={index}>
            <span>{item.name}:{item.price}</span>
          </ul>
        ))
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home;
