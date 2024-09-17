import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
function Signup() {
  const [SignupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...SignupInfo }
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = SignupInfo;
    if (!name || !email || !password) {
      return handleError("Please fill all the feilds");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const reponse = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(SignupInfo)
      })
      const result=await reponse.json();
      const {error}=result;
       if(error){
        return handleError(error.details[0].message);
       }
       
      if(!result.success){
        return handleError(result.message);
      }
      if(result.success){
        handleSuccess(result.message);
        setTimeout(()=>{
          navigate('/login');
        },1000)
      }
      console.log("result:",result);
      
    } catch (error) {
      return handleError(error)
    }
  }
  console.log("LoginInfo->", SignupInfo);

  return (
    <div className='container'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div>
          <lable>Name</lable>
          <input onChange={handleChange} type='text' name='name' autoFocus placeholder='Enter your name...' value={SignupInfo.name} />
        </div>
        <div>
          <lable>Email</lable>
          <input onChange={handleChange} type='email' name='email' placeholder='Enter your email...' value={SignupInfo.email} />
        </div>
        <div>
          <lable>Password</lable>
          <input onChange={handleChange} type='password' name='password' placeholder='Enter your password...' value={SignupInfo.password} />
        </div>
        <button type='submit'>Signup</button>
        <span>Already a user ?
          <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup;