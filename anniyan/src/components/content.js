import React, { useState } from 'react';
import axios from 'axios';
import { franc } from 'franc';

const Content = () => {
  const [input, setInput] = useState('');
  const [audioOutput, setAudioOutput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://anniyan-1.onrender.com/api/process', {
        input: input,
      }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Response:', response.data); // Debugging: Log response data

      if (response.data.audio_output) {
        // Detect language using franc
        const detectedLang = franc(input);
        let langCode = 'te-IN'; // Default to Tamil (ta-IN) if no language detected
        
        // Map franc language codes to speech synthesis language codes
        const languageMap = {
          'tam': 'ta-IN',  // Tamil
          'eng': 'en-US',  // English
          'hin': 'hi-IN', 
          'tel': 'te-IN',
          // Add more language mappings here as needed
        };
        
        // Set the language code based on detection
        if (languageMap[detectedLang]) {
          langCode = languageMap[detectedLang];
          console.log('Detected language:', detectedLang, 'Language code:', langCode);
        } else {
          console.warn(`Language not recognized, defaulting to ${langCode}.`);
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
