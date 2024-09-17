import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
function Login() {
  const [LoginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...LoginInfo }
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;
    if (!email || !password) {
      return handleError("Please fill all the feilds");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const reponse = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(LoginInfo)
      })
      const result=await reponse.json();
      const {error,jwtToken,name}=result;
      localStorage.setItem('token',jwtToken);
      localStorage.setItem('LoggedInUser',name);
       if(error){
        return handleError(error.details[0].message);
       }
       
      if(!result.success){
        return handleError(result.message);
      }
      if(result.success){
        handleSuccess(result.message);
        setTimeout(()=>{
          navigate('/home');
        },1000)
      }
      console.log("result:",result);
      
    } catch (error) {
      return handleError(error)
    }
  }
  console.log("LoginInfo->", LoginInfo);

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <lable>Email</lable>
          <input onChange={handleChange} type='email' name='email' placeholder='Enter your email...' value={LoginInfo.email} />
        </div>
        <div>
          <lable>Password</lable>
          <input onChange={handleChange} type='password' name='password' placeholder='Enter your password...' value={LoginInfo.password} />
        </div>
        <button type='submit'>Login</button>
        <span>No Account ?
          <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login;