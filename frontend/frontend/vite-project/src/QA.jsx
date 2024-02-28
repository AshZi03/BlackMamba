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
          <label>Choose an Answer:</label>
          <div className="btn-group" role="group" aria-label="Options">
            {words.map((word, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  className={`btn ${selectedOption === word ? 'btn-primary' : 'btn-secondary'}`}
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
