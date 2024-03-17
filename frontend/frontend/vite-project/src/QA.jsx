import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const QA = ({ question, options,  onSelectOption}) => {
  const [selectedOption, setSelectedOption] = useState('');
  
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  onSelectOption(option); 
    
  };

  // Check if options is a string
  if (typeof options === 'string') {
    // Split the options string based on spaces
    const words = options.split(' ');

    return (
      <div className="container mt-4">
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
                >
                  {word}
                </button>
              );
            })}
          </div>
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
