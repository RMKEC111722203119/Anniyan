import React from 'react';
import ann from '../assests/anniyan.png'; // Meet Anniyan image
import Content from './content';
import { isTokenAvailable } from './meetAnniyan';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MeetAnniyan = () => {
  const navigate=useNavigate();

  const backgroundStyle = {
    backgroundImage: `url(${ann})`,
    backgroundSize: '135% 99%',
    loop: false,
    backgroundPosition: 'center',
    height: '100vh', // Set height as required
    width: '100%',
  };


  const isTokenAvailable = () => {
    const token = localStorage.getItem('token');
    return token !== null; // Returns true if the token exists, false otherwise
  };

  useEffect(() => {
    if (!isTokenAvailable()) {
      navigate('/'); // Navigate to home if token is not available
    }
  }, [navigate]);

  return (
    <div style={backgroundStyle}>
      <Content /> 
    </div>
  );
};

export default MeetAnniyan;
