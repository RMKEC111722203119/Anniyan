import React, { useRef, useEffect, useState } from 'react';
import videobg from '../assests/abbg.mp4'; // Background video
import ab from'../assests/viki.png'; // About image
import ann from '../assests/anniyan.png'; // Meet Anniyan image
import { Link, useNavigate } from 'react-router-dom';
const About = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); // Start muted
  const [videoEnded, setVideoEnded] = useState(false); // Track if video has ended

  const handleVideoEnd = () => {
    setVideoEnded(true); // Indicate that the video has ended
  };

  const handleUserInteraction = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // Unmute the video
      setIsMuted(false); // Update state
      window.removeEventListener('click', handleUserInteraction); // Remove listener after first interaction
      window.removeEventListener('touchstart', handleUserInteraction); // For mobile devices
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction); // For mobile devices

    return () => {
      // Clean up event listeners on component unmount
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const navigate=useNavigate();

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
    <div className='main'>
      <video
        ref={videoRef}
        autoPlay
        loop={false} // Disable looping
        muted={isMuted}
        className='background-video'
        onEnded={handleVideoEnd} // Handle end of video
        controls={false} // Hide video controls
      >
        <source src={videobg} type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      {videoEnded && ( // Show navigation only if video has ended
        <div className="nav-bar-about">
          <div className="nav-item">
            <Link to="/meet-anniyan">
            <img src={ann} alt="Meet Anniyan" />
            <p>Meet Anniyan</p>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="https://github.com/RMKEC111722203119">
            <img src={ab} alt="About" />
            <p>About creator</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
