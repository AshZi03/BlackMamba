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
    setSelectedLang(lang); // Set the selected language first
    console.log(lang); // Log the selected language directly
  
    // Set the language in localStorage based on the selected language
    if (lang === 'Marathi') {
      localStorage.setItem('Language', 2);
    } else if (lang === 'Hindi') {
      localStorage.setItem('Language', 4);
    } else if (lang === 'German') {
      localStorage.setItem('Language', 3);
    } else if (lang === 'Sanskrit') {
      localStorage.setItem('Language', 5);
    }
  
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
            className={`card2 ${selectedLang === 'Marathi' ? 'border-primary' : ''}`}
            onClick={() => handleLangSelect('Marathi')}
          >
            <div className="card-body">
              <h5 className="card-title">Marathi</h5>
              <p className="card-text">Marathi</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div
            className={`card2 ${selectedLang === 'Japanese' ? 'border-primary' : ''}`}
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
            className={`card2 ${selectedLang === 'German' ? 'border-primary' : ''}`}
            onClick={() => handleLangSelect('German')}
          >
            <div className="card-body">
              <h5 className="card-title">German</h5>
              <p className="card-text">Learn German</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div
            className={`card2 ${selectedLang === 'Sanskrit' ? 'border-primary' : ''}`}
            onClick={() => handleLangSelect('Sanskrit')}
          >
            <div className="card-body">
              <h5 className="card-title">Sanskrit</h5>
              <p className="card-text">Learn Sankrit</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div
            className={`card2 ${selectedLang === 'Hindi' ? 'border-primary' : ''}`}
            onClick={() => handleLangSelect('Hindi')}
          >
            <div className="card-body">
              <h5 className="card-title">Hindi</h5>
              <p className="card-text">Learn Hindi</p>
            </div>
          </div>
        </div>
        {/* Add more languages as needed */}
      </div>
    </div>
  );
};

export default LangSelect;
