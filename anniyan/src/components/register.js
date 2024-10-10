import React, { useState } from 'react';
import axios from 'axios';
import './DoorAnimation.css'; // Assuming you have door animation styles
import { useNavigate } from 'react-router-dom'; // For navigation

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isDoorOpen, setIsDoorOpen] = useState(false); // State for door animation
  const navigate = useNavigate(); // Hook for navigation

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/register', { email, password },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        }
      );
      setMessage('Registration successful!');
      setIsDoorOpen(true); // Open the door on successful registration
      localStorage.setItem('token', response.data.token);

      // Wait for the door animation, then navigate to /home
    
        navigate('/home');
       // Adjust time to match animation duration
    } catch (error) {
      setMessage('Registration failed. ' + error.response?.data?.msg || 'Please try again.');
      setIsDoorOpen(false); // Keep the door closed on failure
    }
  };

  return (
    <div className="login-page">
      <div className={`login-container ${isDoorOpen ? 'door-open' : 'door-closed'}`}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
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
         
          <button type="submit">Register</button>
          <button className='login-navigate' onClick={() => navigate("/")}>Log in</button>

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

export default Register;
