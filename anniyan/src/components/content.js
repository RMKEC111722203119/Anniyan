import React, { useState } from 'react';
import axios from 'axios';
import { franc } from 'franc-min';

const Content = () => {
  const [input, setInput] = useState('');
  const [audioOutput, setAudioOutput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/process', {
        input: input,
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Add the token in the Authorization header
        }
    });;

      console.log('Response:', response.data); // Debugging: Log response data

      if (response.data.audio_output) {
        // Detect language
        const detectedLang = franc(input);
        let langCode = 'ta'; // Default to Tamil if no language detected
        
        // Map franc language codes to speech synthesis language codes
        const languageMap = {
          'tam': 'ta-IN',
          'eng': 'en-US',     
          'hin': 'hi-IN', 
          'tel': 'te-IN', 
    
      };
      

        // Set the language code based on detection
        if (languageMap[detectedLang]) {
          langCode = languageMap[detectedLang];
        }

        const utterance = new SpeechSynthesisUtterance(response.data.audio_output);
        utterance.lang = langCode; // Set the detected language for the utterance
        window.speechSynthesis.speak(utterance);
        setAudioOutput(response.data.audio_output); // Set audio output for display
      } else {
        console.error('No audio_output in response:', response.data);
      }
    } catch (error) {
      console.error('Error processing input:', error);
    }
  };

  return (
    <div className='main-content'>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe the problem you faced..."
          value={input}
          onChange={handleInputChange}
          rows="4"
          cols="50"
          required
        />
        <br />
        <button type="submit">Get Punishment</button>
      </form>
      {audioOutput && (
        <div>
          <h3>Punishment Output:</h3>
          <p>{audioOutput}</p>
        </div>
      )}
    </div>
  );
};

export default Content;
