import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const isLoggedIn = localStorage.getItem("email") ? true : false;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const CreateBlog = () => {
    if (isLoggedIn) {
      navigate("/api/posts/create");
    } else {
      alert("Please login to create a blog");
    }
  };

  const Logout = () => {
    localStorage.removeItem("email");
    alert("Logout successful.");
    navigate("/api/login");
  };

  return (
    <div className='container'>
      <div className='nav-left'>
        <h1><Link to="/" className='Logo'>Blog App</Link></h1>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>

      <div className={`Menu ${menuOpen ? 'active' : ''}`}>
        <button className='blogBtn' onClick={CreateBlog}>Create Blog</button>
        {isLoggedIn ? (
          <>
            <button onClick={Logout} className='logBtn'>Logout</button>
            <Link to="/api/posts/dashboard"><button className='logBtn'>Dashboard</button></Link>
          </>
        ) : (
          <Link to='/api/login'><button className='logBtn'>Login</button></Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
