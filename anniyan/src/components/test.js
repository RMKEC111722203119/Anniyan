import React, { useRef, useEffect, useState } from 'react';
import videobg from '../assets/anniyan bg.mp4'; // Original video
import punishmentVideo from '../assets/punishment.mp4'; // Punishment video
import Content from './content'; // Ensure this component is defined and available

const Main = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPunishmentPlaying, setIsPunishmentPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(videobg);

  const handlePlayPunishmentVideo = () => {
    if (videoRef.current) {
      setIsPunishmentPlaying(true);
      setCurrentVideo(punishmentVideo);
      videoRef.current.play();
    }
  };

  const handleVideoEnd = () => {
    if (isPunishmentPlaying) {
      setIsPunishmentPlaying(false);
      setCurrentVideo(videobg);
      videoRef.current.play();
    }
  };

  const handleUserInteraction = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  return (
    <div className='main'>
      <video
        ref={videoRef}
        autoPlay
        loop={!isPunishmentPlaying}
        muted={isMuted}
        className='background-video'
        onEnded={handleVideoEnd}
        key={currentVideo}
      >
        <source src={currentVideo} type='video/mp4' />
        
      </video>
      <button onClick={handlePlayPunishmentVideo}>Get Punishment</button>
      <Content />
    </div>
  );
};

export default Main;
