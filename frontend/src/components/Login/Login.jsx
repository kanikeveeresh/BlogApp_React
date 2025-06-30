import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import axios from 'axios'

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const Login = async() => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: email,
        password: password
      })
      console.log(response);
      if(response) {
        localStorage.setItem("email", email);
      }
      alert("Login successful");
      navigate("/");
    }
    catch(err) {
      if(err.response?.status === 404) {
        return setMsg("User Not Found. Please Register.");
      }
      else if(err.response?.status === 401) {
        return setMsg("Invalid password. Try again");
      }
      else {
        alert("Internal server error");
      }
    }
  }
  return (
    <div className="loginMainContainer">
      <div className="loginContainer">
        <h1>Login</h1>
        <div className="detailsLoginContainer">
          <input type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          {msg && <span style={{color: 'red'}}>{msg}</span>}
          <button onClick={Login}>Login</button>
        </div>
        <p>
          Don't have an account? <Link to="/api/signup">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
