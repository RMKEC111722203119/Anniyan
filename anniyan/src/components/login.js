import React, { useState } from 'react';
import axios from 'axios';
import './DoorAnimation.css'; // For the door animation styles
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for route redirection

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isDoorOpen, setIsDoorOpen] = useState(false); // State to control the door animation
  const navigate = useNavigate(); // Hook for routing

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://vercel.live/link/backend-git-main-rmkec111722203119s-projects.vercel.app?via=deployment-domains-list&p=1/', { email, password },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        }
      );
      setMessage('Login successful!');
      setIsDoorOpen(true); // Open the door upon successful login
      localStorage.setItem('token', response.data.token);

      // Wait for the door animation to complete (e.g., 1.5 seconds), then navigate to /home
        navigate('/home'); // Redirect to /home after the door opens
       // Adjust time to match the door opening duration
    } catch (error) {
      setMessage('Login failed. Bad email or password.');
      setIsDoorOpen(false); // Keep the door closed on login failure
    }
  };

  return (
    <div className="login-page">
      <div className={`login-container ${isDoorOpen ? 'door-open' : 'door-closed'}`}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <button className='login-navigate' onClick={() => navigate("/register")}>Register</button>

        </form>
        <p>{message}</p>
      </div>

      {/* Door animation in the background */}
      <div className={`door ${isDoorOpen ? 'open' : 'closed'}`}>
        <div className="left-door"></div>
        <div className="right-door"></div>
      </div>
    </div>
  );
};

export default Login;
