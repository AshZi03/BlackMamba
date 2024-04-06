import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const QA = ({ question, options, onSelectOption }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [requestCount, setRequestCount] = useState(0);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onSelectOption(option);
    speak(option); // Speak the selected option
  };

  // Function to speak a word
  const speak = (word) => {
    const languageCode = localStorage.getItem('Language');
    let lang;
    
    switch (languageCode) {
      case '1':
        lang = 'ja-JP'; // Japanese
        break;
      case '2':
        lang = 'mr-IN'; // Marathi
        break;
      // ... other cases
      default:
        lang = 'en-US'; // Default to English
    }
    
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = lang;
  
    // Add a console log here to check the language value
    console.log(`Speaking word: ${word} in language: ${lang}`);
    window.speechSynthesis.speak(utterance);
  };
   

  // Function to translate text
  const translateText = async (text, sourceLang, targetLang) => {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;

    try {
      const response = await fetch(url);
      const jsonResponse = await response.json();
      if (jsonResponse.responseData && jsonResponse.responseData.translatedText) {
        return jsonResponse.responseData.translatedText;
      } else {
        throw new Error('Translation failed');
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  // Handle mouse over event
  const handleMouseOver = async (event, word) => {
    if (requestCount < 3) {
      setRequestCount(requestCount + 1);
      const language = localStorage.getItem('Language');
      const getLanguageName = (code) => {
        switch (code) {
          case '1':
            return 'Japanese';
          case '2':
            return 'Marathi';
          case '4':
            return 'Hindi';
          case '3':
            return 'German';
          case '5':
            return 'Sanskrit';
          // Add more cases for other language codes as needed
          default:
            return 'Unknown'; // Default to 'Unknown' if the code is not recognized
        }
      };
      const languageName = getLanguageName(language);
      console.log(languageName);
      const translatedText = await translateText(word, languageName, 'en');
      setTooltipText(translatedText);
      const rect = event.target.getBoundingClientRect();
      setTooltipPosition({ top: rect.bottom, left: rect.left });
    }
  };
  // Handle mouse out event
  const handleMouseOut = () => {
    setTooltipText('');
  };

  // Reset request count every three seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRequestCount(0);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Check if options is a string
  if (typeof options === 'string') {
    // Split the options string based on spaces
    const words = options.split(' ');

    return (
      <div className="central-box" >
        <div className="form-group">
          <label htmlFor="textArea">Question:</label>
          <p>{question}</p>
        </div>

        <div className="form-group">
          <div className="btn-group" role="group" aria-label="Options">
            {words.map((word, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  className={`btn ${selectedOption === word ? 'Selected-Button' : 'Non-Selected-Button'}`}
                  onClick={() => handleOptionChange(word)}
                  onMouseOver={(event) => handleMouseOver(event, word)}
                  onMouseOut={handleMouseOut}
                >
                  {word}
                </button>
              );
            })}
          </div>
          {tooltipText && (
            <div
              className="word-tooltip"
              style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
            >
              {tooltipText}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    console.log('Options is not a string:', options);
    console.log(typeof options);
    return null; // Render nothing if options is not a string
  }
};

export default QA;
