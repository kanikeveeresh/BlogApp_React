import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import axios from 'axios'

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);

        if (password && value && password !== value) {
        setError('Passwords must match');
        } else {
        setError('');
        }
    };

    const CreateAccount = async() => {
        try{
            await axios.post("http://localhost:5000/api/signup", {
                email: email,
                password: password
            })
            alert("Account created successfully.");
            navigate("/api/login");
        }
        catch(err) {
            if(err.response?.status === 409) {
                return setError("Email Already exists. Please Login");
            }
            else {
                alert("Internal server error");
            }
        }
    }

    return (
        <div className="registerMainContainer">
            <div className="registerContainer">
                <h1>Register</h1>
                <div className="detailsContainer">
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    {error && <span style={{ color: 'red'}}>{error}</span>}
                    <button onClick={CreateAccount}>Create Account</button>
                </div>
                <p>
                    Already have an account? <Link to="/api/login">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register
