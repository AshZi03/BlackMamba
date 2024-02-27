import React, { useState, useEffect } from 'react';
import './LangSelect.css';
import { useNavigate } from 'react-router-dom';

const LangSelect = () => {
  const [selectedLang, setSelectedLang] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate(); // Use navigate hook 

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem('userid');
    console.log(userIdFromLocalStorage);
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage);
    } else {
      // If userId is not set in localStorage, redirect to login page
      navigate('/Login');
    }
  }, []); // Empty dependency array to run the effect only once

  const handleLangSelect = async (lang) => {
    setSelectedLang(lang); 
    try {
      const url = 'http://localhost:8081/LanguageSelector';
    
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId, // Send the userId to the backend
          selectedLang: lang,
        }),
      });
  
      if (response.ok) {
        // Navigate to the main page upon successful language selection
        navigate('/MainPage');
      } else {
        // Handle HTTP errors
        console.error('Error while saving language selection:', response.statusText);
      }
    } catch (error) {
      console.error('Error while saving language selection:', error.message);
      // Handle any network or other errors
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Select a Language</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div
            className={`card ${selectedLang === 'English' ? 'border-primary' : ''}`}
            onClick={() => handleLangSelect('English')}
          >
            <div className="card-body">
              <h5 className="card-title">English</h5>
              <p className="card-text">Learn English</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div
            className={`card ${selectedLang === 'Japanese' ? 'border-primary' : ''}`}
            onClick={() => handleLangSelect('Japanese')}
          >
            <div className="card-body">
              <h5 className="card-title">Japanese</h5>
              <p className="card-text">Japanese</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div
            className={`card ${selectedLang === 'French' ? 'border-primary' : ''}`}
            onClick={() => handleLangSelect('French')}
          >
            <div className="card-body">
              <h5 className="card-title">French</h5>
              <p className="card-text">Learn French</p>
            </div>
          </div>
        </div>
        {/* Add more languages as needed */}
      </div>
    </div>
  );
};

export default LangSelect;
